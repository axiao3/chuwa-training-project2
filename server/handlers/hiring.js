const Token = require("../models/token");
const User = require("../models/user");
const Application = require("../models/application");
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const AWS = require('aws-sdk');

exports.getRegistrationHistory = async function (req, res, next) {
  try {
    // Fetch all the tokens
    const tokens = await Token.find({})
      .sort("-expiresAt")
      .select("registrationLink email token")
      .exec();

    console.log("tokens", tokens);
    const result = [];

    // Loop over the tokens to gather the required information
    for (let token of tokens) {
      const user = await User.findOne({ token: token.token })
        .select("username applicationStatus")
        .exec();
      console.log("user: ", user);

      const isSubmitted =
        user && user.applicationStatus !== "never submitted" ? true : false;

      result.push({
        registrationLink: token.registrationLink,
        email: token.email,
        username: user ? user.username : null, // return null if no user is found with the token
        isSubmitted: isSubmitted,
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log("error: ", err);
    return next(err);
  }
};

exports.getInprogress = async function (req, res, next) {
  try {
    const Inprogress = await Application.find({ 
      authorizationType: 'F1(CPT/OPT)', 
      I20Status: { $ne: 'approved' } 
  }).sort({ _id : -1 });
    return res.status(200).json(Inprogress);
  } catch (err) {
    console.log("Inprocess error: ", err);
    return next(err);
  }
};

const uploadToS3 = (base64Data) => {
  const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1'  // Replace 'your-region' with your AWS region, e.g., 'us-west-1'
  });

  const buffer = Buffer.from(base64Data.split(",")[1], 'base64');
  const mimeType = base64Data.split(";")[0].split(":")[1];  // Extracts MIME type from "data:{MIME};base64"

  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${Math.round(Math.random() * 1E9)}`,  // Generate a unique filename
      Body: buffer,
      ContentType: mimeType,
      ContentEncoding: 'base64'
  };
  
  return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
          if (err) reject(err);
          resolve(data.Location); 
      });
  });
};

exports.updateApplicationById = async function (req, res, next) {
  try {
    const { workAuthorization, profilePicture, driverLicense, OPTEAD, I983, I20 } = req.body
    if (workAuthorization && workAuthorization.slice(0,4) === "data") {
      const workAuthorizationUrl = await uploadToS3(workAuthorization);  
      req.body.workAuthorization = workAuthorizationUrl; 
    }
    if (profilePicture && profilePicture.slice(0,4) === "data") {
      const profilePictureUrl = await uploadToS3(profilePicture);  
      req.body.profilePicture = profilePictureUrl;
    }
    if (driverLicense && driverLicense.slice(0,4) === "data") {
      const driverLicenseUrl = await uploadToS3(driverLicense); 
      req.body.driverLicense = driverLicenseUrl; 
    } 
    if (OPTEAD && OPTEAD.slice(0,4) === "data") {
      const OPTEADUrl = await uploadToS3(OPTEAD); 
      req.body.OPTEAD = OPTEADUrl; 
    } 
    if (I983 && I983.slice(0,4) === "data") {
      const I983Url = await uploadToS3(I983); 
      req.body.I983 = I983Url; 
    } 
    if (I20 && I20.slice(0,4) === "data") {
      const I20Url = await uploadToS3(I20); 
      req.body.I20 = I20Url; 
    } 

    const employeeId = req.params.id;
    const updates = req.body;

    const updatedApplication = await Application.findOneAndUpdate(
      { user: employeeId },
      updates,
      { new: true } 
    );

    return res.status(200).json(updatedApplication);
  } catch (err) {
    console.log("error: ", err);
    return next(err);
  }
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendNotification = async function (req, res, next) {
  try {
    const { email, type } = req.body;
    console.log("email: ", email);

    let mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: `Reminder of submitting ${type} file`,
      text: `A Hr is sending you this email notification to remind you submit your ${type} file in time :)`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Email Notification sent." });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
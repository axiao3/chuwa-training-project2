const AWS = require('aws-sdk');
const Application = require("../models/application");
const db = require("../models");

exports.createApplication = async function (req, res, next) {
  try {
    console.log("data: ", req.body);

    const { workAuthorization, profilePicture, driverLicense } = req.body
    const profilePictureUrl = await uploadToS3(profilePicture);  
    const workAuthorizationUrl = await uploadToS3(workAuthorization);  
    const driverLicenseUrl = await uploadToS3(driverLicense);  

    req.body.profilePicture = profilePictureUrl;
    req.body.workAuthorization = workAuthorizationUrl;
    req.body.driverLicense = driverLicenseUrl;

    const item = await Application.create(req.body);

    const foundUser = await db.User.findById(req.body.user);
    foundUser.applicationStatus = "pending";
    await foundUser.save();

    return res.status(200).json(item);
  } catch (err) {
    console.log("error: ", err);
    return next(err);
  }
};

exports.getApplicationById = async function (req, res, next) {
  try {
    const employeeId = req.params.id;
    const application = await db.Application.findOne({ user: employeeId });

    if (!application) {
      return res
        .status(404)
        .json({ message: "Application of this employee is not found" });
    }
    console.log("got application: ", application);
    return res.status(200).json(application);
  } catch (err) {
    return next(err);
  }
};

exports.getAllApplications = async function (req, res, next) {
  try {
    const applications = await db.Application.find();
    return res.status(200).json(applications);
  } catch (err) {
    return next(err);
  }
};

exports.updateApplicationById = async function (req, res, next) {
  try {
    const { workAuthorization, profilePicture, driverLicense } = req.body
    const profilePictureUrl = await uploadToS3(profilePicture);  
    const workAuthorizationUrl = await uploadToS3(workAuthorization);  
    const driverLicenseUrl = await uploadToS3(driverLicense);  

    req.body.profilePicture = profilePictureUrl;
    req.body.workAuthorization = workAuthorizationUrl;
    req.body.driverLicense = driverLicenseUrl;
    req.body.submittedStatus = "pending";

    const employeeId = req.params.id;
    const updates = req.body;

    const updatedApplication = await db.Application.findOneAndUpdate(
      { user: employeeId },
      updates,
      { new: true }
    );

    const foundUser = await db.User.findById(employeeId);
    foundUser.applicationStatus = "pending";
    await foundUser.save();

    // if (!updatedApplication) {
    //   return res
    //     .status(404)
    //     .json({ message: "Employee Application not found" });
    // }
    return res.status(200).json(updatedApplication);
  } catch (err) {
    console.log("error: ", err);
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
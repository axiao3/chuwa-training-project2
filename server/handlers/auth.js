const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.generateToken = async function (req, res, next) {
  try {
    const { email } = req.body;
    console.log("email: ", email);
    const token = jwt.sign(
      { email, timestamp: Date.now() },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" }
    );
    console.log("token: ", token);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 3);

    const registrationLink = `http://localhost:5173/signup?token=${token}`;

    const newToken = new db.Token({ token, email, expiresAt, registrationLink });
    await newToken.save();
    
    let mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Registration for Employee Portal",
      text: `Click here to register: ${registrationLink}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Token generated and email sent." });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};


exports.isTokenValid = async function (req, res, next) {
  const { token } = req.query;

  const tokenEntry = await db.Token.findOne({ token });
  if (!tokenEntry) {
    return res.status(400).json({ message: "Invalid Link." });
  }
  if (tokenEntry.isUsed) {
    return res.status(400).json({ message: "Link already used." });
  }
  if (new Date() > tokenEntry.expiresAt) {
    return res.status(400).json({ message: "Link has expired." });
  }
  return res.status(200).json({ token });
};


exports.getEmailByToken = async function (req, res, next) {
  const { token } = req.query;
  try {
    const tokenEntry = await db.Token.findOne({ token });
    const email = tokenEntry.email;
    return res.status(200).json({ email });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};


exports.signup = async function (req, res, next) {
  
  // console.log("BEFORE: token, email, username, password: ", token, email, username, password);
  let { token } = req.body;
  console.log("token before try: ", token);
  const tokenEntry = await db.Token.findOne({ token });
  // console.log("tokenEntry: ", tokenEntry);
  try {
    console.log("token after try: ", token);
    let { email, username, password } = req.body;
    // console.log("AFTER: email, username, password: ", email, username, password);
    let user = await db.User.create({ email, username, password, token, emailReceivedLink: tokenEntry.email });
    // console.log("user: ", user);
    tokenEntry.isUsed = true;
    await tokenEntry.save();

    let { id, emailReceivedLink, type, applicationStatus } = user;
    token = jwt.sign({ id, email, emailReceivedLink, username, type, applicationStatus }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ id, email, emailReceivedLink, username, type, applicationStatus, token });
  } catch (err) {
    console.log("there is error: ", err.message);
    if (err.code === 11000) {
      // console.log("Error: This email or username is taken");
      err.message = "This email or username is taken";
    }
    // console.log("err.message: ", err.message);
    return next({
      status: 400,
      message: err.message,
    });
  }
};


exports.signin = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.body.username,
    });
    console.log("user: ", user);
    if (!user) {
      return next({
        status: 400,
        message: "Invalid Username / Password.",
      });
    }
    let { username, email, emailReceivedLink, type, id, applicationStatus } = user;
    let isMatch = await user.comparePassword(req.body.password);
    console.log("isMatch: ", isMatch);
    if (isMatch) {
      // Generate JWT Token
      let token = jwt.sign(
        { id, email, emailReceivedLink, username, type, applicationStatus },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({ id, email, emailReceivedLink, username, token, applicationStatus, type });
    } else {
      return next({
        status: 400,
        message: "Invalid Username / Password.",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

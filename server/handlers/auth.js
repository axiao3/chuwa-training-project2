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
      { expiresIn: "1h" }
    );
    console.log("token: ", token);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const newToken = new db.Token({ token, email, expiresAt });
    await newToken.save();

    const registrationLink = `http://localhost:5173/signup?token=${token}`;
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

exports.signup = async function (req, res, next) {
  
  // console.log("BEFORE: token, email, username, password: ", token, email, username, password);
  const { token } = req.body;
  const tokenEntry = await db.Token.findOne({ token });
  // console.log("tokenEntry: ", tokenEntry);
  try {
    let { email, username, password } = req.body;
    // console.log("AFTER: email, username, password: ", email, username, password);
    let user = await db.User.create({ email, username, password });
    // console.log("user: ", user);
    tokenEntry.isUsed = true;
    await tokenEntry.save();

    let { id } = user;
    let token = jwt.sign({ id, email, username }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ id, email, username, token });
  } catch (err) {
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
    let { username, email, type, id } = user;
    let isMatch = await user.comparePassword(req.body.password);
    console.log("isMatch: ", isMatch);
    if (isMatch) {
      // Generate JWT Token
      let token = jwt.sign(
        { id, email, username, type },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({ id, email, username, token, type });
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

// exports.generateTokenAndSendEmail = async function(req, res, next) {
//     try {
//       const { email } = req.body;

//       // Generate a random token
//       const token = crypto.randomBytes(20).toString('hex');

//       // TODO: Store the token in a database associated with the email

//       // Setup nodemailer transporter (using Gmail for this example)
//       let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.GMAIL_ADDRESS,
//           pass: process.env.GMAIL_PASSWORD
//         }
//       });

//       // Send email with the token
//       const mailOptions = {
//         from: process.env.GMAIL_ADDRESS,
//         to: email,
//         subject: 'Your Registration Token',
//         text: `Your registration token is: ${token}`
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           res.status(500).send('Error sending email');
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.send('Email sent successfully');
//         }
//       });
//     } catch (err) {
//       return next({
//         status: 400,
//         message: err.message,
//       });
//     }
//   };

// exports.ifEmailExist = async function (req, res, next) {
//   try {
//     const user = await findUserByEmail(req.body.email);
//     if (user) {
//       return res.status(200).json({
//         isEmailExist: true
//       });
//     } else {
//       return next({
//         status: 400,
//         message: "Email is not registered",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// exports.changePassword = async function (req, res, next) {
//   try {
//     const user = await findUserByEmail(req.body.email);
//     const { id, email, type } = user;

//     const oldPasswordIsMatch = await user.comparePassword(req.body.previous);

//     if (oldPasswordIsMatch) {
//       const newPasswordIsMatch = await user.comparePassword(req.body.current);

//       if (!newPasswordIsMatch) {
//         user.password = req.body.current;
//         await user.save();
//         let token = jwt.sign({ id, email, type }, process.env.JWT_SECRET_KEY);
//         return res.status(200).json({
//           id,
//           email,
//           token,
//         });
//       } else {
//         return next({
//           status: 400,
//           message: "New password must be different from the current one",
//         });
//       }
//     } else {
//       return next({
//         status: 400,
//         message: "Previous Password incorrect",
//       });
//     }
//   } catch (err) {
//     return next({
//       status: 400,
//       message: err.message,
//     });
//   }
// };

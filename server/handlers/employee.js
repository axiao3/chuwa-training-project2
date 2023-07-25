const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const findEmployeeByEmail = async function (email) {
  const employee = await db.Employee.findOne({
    email: email,
  });
  return employee;
};

exports.addEmployee = async function (req, res, next) {
  try {
    let employee = await db.Employee.create(req.body);
    return res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      // If the email is taken, send a 400 Bad Request response with a custom error message
      return res.status(400).json({ message: "This email is taken" });
    }
    // For other errors, use the default error handling middleware
    return next(err);
  }
};

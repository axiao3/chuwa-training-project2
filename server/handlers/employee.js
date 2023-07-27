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
    return res.status(200).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "This email is taken" });
    }

    return next(err);
  }
};

exports.getEmployeeById = async function (req, res, next) {
  try {
    const employeeId = req.params.id;
    const employee = await db.Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (err) {
    return next(err);
  }
};

exports.getAllEmployees = async function (req, res, next) {
  try {
    const employees = await db.Employee.find();
    return res.status(200).json(employees);
  } catch (err) {
    return next(err);
  }
};

exports.updateEmployeeById = async function (req, res, next) {
  try {
    const employeeId = req.params.id;
    const updates = req.body;

    const updatedEmployee = await db.Employee.findByIdAndUpdate(
      employeeId,
      updates,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(updatedEmployee);
  } catch (err) {
    return next(err);
  }
};

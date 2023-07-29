const Application = require("../models/application");
const db = require("../models");

exports.createApplication = async function (req, res, next) {
  try {
    console.log("data: ", req.body);
    const item = await Application.create(req.body);
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
    const employeeId = req.params.id;
    const updates = req.body;

    const updatedApplication = await db.Application.findOneAndUpdate(
      { user: employeeId },
      updates,
      { new: true }
    );

    if (!updatedApplication) {
      return res
        .status(404)
        .json({ message: "Employee Application not found" });
    }

    return res.status(200).json(updatedApplication);
  } catch (err) {
    return next(err);
  }
};

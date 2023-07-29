const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
} = require("../handlers/employee");
const {
  getAllApplications,
  getApplicationById,
  updateApplicationById,
} = require("../handlers/application");

//router.post("/employees", addEmployee);
router.get("/employees/:id", getApplicationById);
router.get("/employees", getAllApplications);
router.put("/employees/:id", updateApplicationById);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
} = require("../handlers/employee");

router.post("/employees", addEmployee);
router.get("/employees/:id", getEmployeeById);
router.get("/employees", getAllEmployees);
router.put("/employees/:id", updateEmployeeById);

module.exports = router;

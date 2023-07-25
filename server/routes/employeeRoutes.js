const express = require("express");
const router = express.Router();
const { addEmployee } = require("../handlers/employee");

router.post("/employees", addEmployee);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationById,
} = require("../handlers/application");
const { ensureCorrectUser } = require("../middleware/ensureCorrectUser");
const { ensureManager } = require("../middleware/ensureManager");

router.post("/", ensureCorrectUser, createApplication);
router.get("/", ensureManager, getAllApplications);
router.get("/:id", ensureManager, getApplicationById);
router.put("/:id", ensureCorrectUser, updateApplicationById);
//manager edit application

module.exports = router;

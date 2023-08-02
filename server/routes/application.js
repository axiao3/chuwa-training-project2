const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationById,
} = require("../handlers/application");
const { ensureCorrectUser } = require("../middleware/ensureCorrectUser");
const { ensureManager } = require("../middleware/ensureManager");

router.post("/", ensureCorrectUser, createApplication);
router.get("/", ensureManager, getApplications);
// router.get("/:id", ensureManager, getApplicationById);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplicationById);
//manager edit application

module.exports = router;

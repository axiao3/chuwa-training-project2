const express = require('express');
const router = express.Router({ mergeParams: true });
const { createApplication } = require('../handlers/application');
const { ensureCorrectUser } = require("../middleware/ensureCorrectUser");

router.post('/', ensureCorrectUser, createApplication);

module.exports = router;
const express = require('express');
const router = express.Router({ mergeParams: true });
const { getRegistrationHistory } = require('../handlers/hiring');
// const { ensureCorrectUser } = require("../middleware/ensureCorrectUser");

router.get('/', getRegistrationHistory);

module.exports = router;
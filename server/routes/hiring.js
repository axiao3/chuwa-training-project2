const express = require('express');
const router = express.Router({ mergeParams: true });
const { getRegistrationHistory, getInprogress, updateApplicationById, sendNotification } = require('../handlers/hiring');
// const { ensureCorrectUser } = require("../middleware/ensureCorrectUser");

router.get('/token', getRegistrationHistory);
router.get('/Inprogress', getInprogress);
router.put('/:id', updateApplicationById);
router.post('/notification', sendNotification);

module.exports = router;
const express = require('express');
const router = express.Router({ mergeParams: true });
const { signup, signin, generateToken, isTokenValid, getEmailByToken } = require('../handlers/auth');

router.post('/generateToken', generateToken);
router.get('/token', isTokenValid);
router.get('/email', getEmailByToken);
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
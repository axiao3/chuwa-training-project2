const express = require('express');
const router = express.Router();
const { signup, signin, generateToken, isTokenValid } = require('../handlers/auth');


router.post('/generateToken', generateToken);
router.get('/token', isTokenValid);
router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
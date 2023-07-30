const express = require('express');
const router = express.Router({ mergeParams: true });
const { signup, signin, generateToken, isTokenValid, getUserById } = require('../handlers/auth');

router.post('/generateToken', generateToken);
router.get('/token', isTokenValid);
// router.get('/email', getEmailByToken);
router.get('/:id', getUserById);

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
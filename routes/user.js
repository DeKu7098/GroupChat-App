const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/user/signUp', userController.signUp);
router.post('/user/signIn', userController.signIn);

module.exports = router;
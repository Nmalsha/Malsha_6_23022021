const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

//router.post('api/auth/signup',userCtrl.signup);
//router.post('api/auth/login',auth,userCtrl.login);

module.exports = router;
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const app = require ('../app');

//router.post('/api/auth/signup',auth,userCtrl.signup);
//router.post('/api/auth/login',auth,userCtrl.login);

module.exports = router;
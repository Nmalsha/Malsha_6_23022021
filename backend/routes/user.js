const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const app = require ('../app');

router.post("/signup",auth,userCtrl.signup);
router.post("/login",auth,userCtrl.login);

module.exports = router;
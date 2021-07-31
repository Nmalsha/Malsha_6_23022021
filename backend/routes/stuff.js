const express = require('express');
const router = express.Router();
//adding controller
const soucesController = require('../controllers/stuff')

//adding middleware authentification
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer_config');

/*
//catching the All sources from the DB
router.get("/api/sauces",auth,soucesController.findAllSouces);
 // create the new saourse in the DB
 router.post("/api/sauces",auth,multer,soucesController.createSauce);
//find one sauce
router.get("/api/sauces/:id",auth,soucesController.findOneSauce);
//update a source

//delete source

router.post("/api/sauces/:id/like",auth,soucesController.likeSauce

*/
  module.exports = router;
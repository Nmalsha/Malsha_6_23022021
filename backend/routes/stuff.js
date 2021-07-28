const express = require('express');
const router = express.Router();
//adding controller
const soucesController = require('../controllers/stuff')


const auth = require('../middleware/auth');
const multer = require ('../middleware/multer_config');






  // create the new saourse in the DB
//  router.post("/sauces",auth,multer,soucesController.createSauce)
//catching the new sources from the DB
 //router.get("/sauces",auth,multer,soucesController.findAllSouces)
  //find one sauce
 // router.get("/:id",auth,multer,soucesController.findOneSauce)
  //update a source
 // router.patch("/:id",multer,soucesController.updatesauce)
  
 //delete source
  //router.delete("/:id",soucesController.deletesauce)
  
  module.exports = router;
const express = require('express');
const router = express.Router();

//adding controller
const soucesController = require('../controllers/saurce')

//adding middleware authentification
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer_config');

//catching the All sources from the DB
router.get("/",auth,soucesController.findAllSouces);
 // create the new saourse in the DB
 router.post("/",auth,multer,soucesController.createSauce);
//find one sauce
router.get("/:id",auth,soucesController.findOneSauce);
//modify a source
router.put("/:id",auth,multer,soucesController.modifysauce);
//delete source
router.delete("/:id",auth,soucesController.deletesauce);
//like dislike system
router.post("/:id/like",soucesController.likeSauce);





  module.exports = router;
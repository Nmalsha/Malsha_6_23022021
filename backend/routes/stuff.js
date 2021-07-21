const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer_config');

  // create the new saourse in the DB
  router.post('/',auth,multer, stuffCtrl.createSource);
 //catching the new sources from the DB
  router.use('/',auth,stuffCtrl.getAllSouces);
  //TODO
  //modify a source
  //router.put('/:id',multer, stuffCtrl.modifySource);
  //get On Source
//router.delete('/:id', stuffCtrl.deleteSource);
  //delete source
  //router.get('/:id', stuffCtrl.getOnSource);
  module.exports = router;
const sources =require ('../models/sources');
//package for delete the image from the server
const fs = require('fs');

//function to create source
exports.createSource = (req, res, next) => {
  const sourceObject = JSON.parse(req,body,source);
    delete req.body._id;
    const sourceObject = new sources({
      ...sourceObject,
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    source.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

  //function get all sources from the DB

  exports.getAllSouces = (req, res, next) => {
    sources.find()
      .then(source => res.status(200).json(source))
      .catch(error => res.status(400).json({ error }));
  }
  //TODO
   //function modify sources from the DB
   //function get on source from the DB
   //function delete sources from the DB
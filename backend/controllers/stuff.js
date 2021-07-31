
//package for delete the image from the server
const fs = require('fs');
const app = require('../app');
//adding sources
const saucesModel =require ('../models/sources');







//-----------------function to Find sauces---------------
exports.findAllSouces = async(req,res)=>{
  const souce = await saucesModel.find()
  .then(souce => res.status(200).json(souce))
  .catch(error => res.status(400).json({error}));

  //res.send({data: souce})

       }

     

//-------------function to create source----------------
//get userId
//db.getUser("_id");


exports.createSauce = async (req, res)=>{

 //const sauceObject = JSON.parse(req.body.saucesModel);
  delete req.body._id;
 
//console.log(sauceObject);
  const newsauce =  new saucesModel(
    {name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      heat: req.body.heat,
      likes:0,
      dislikes: 0,
      imageUrl:  req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      usersLiked: [],
      usersDisliked: [],
      userId: req.body.userId
      }
  );
  console.log(newsauce);
 


newsauce.save()
 .then(() => res.status(201).json({ message: 'Objet enregistré !'}))

 .catch(error =>{ res.status(400).json({ error :error});
 });
 //.catch(error => res.status(400).json({ error :error}));


 
  
  
}

//-----------------function to find a sauce-----------------------

exports.findOneSauce = async(req,res) => {
 
     saucesModel.findById({_id:req.params.id})
    
    .then(() => res.status(201).json({ message: 'Objet trouvé !'}))
  .catch(error =>res.status(400).json({ error :error}));

  


}

/*
exports.createSauce = async(req, res)=>{
  try{
    delete req.body._id;
  let newsauce =  new saucesModel({
    ...req.body
  });
  console.log('before save');
  await newsauce.save();
  console.log(newsauce);
  console.log('after save');

  }catch(error){
    console.log('error'+error);
    res.status(400).send(error);
  }
}







exports.createSauce = (req, res)=>{
  let newsauce =  new saucesModel(req.body);

  //newsauce.unmarkModified();
 
  
newsauce.save().then(
  () => {
    console.log(newsauce);
    res.send({data:newsauce});
    res.status(201).json({
      message: 'Post saved successfully!'
    });
  }
).catch(
  (error) => {
    res.status(400).json({
      error: error
    });
  }
);
}


{name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    imageUrl:  req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    usersLiked: req.body.usersLiked,
    usersDisliked: req.body.usersDisliked,
    userId: req.body.userId
    }
exports.createSauce = async(req, res)=>{
  consol.log(req.body);
  const sourceObject = JSON.parse(req,body,saurces);
  const sauce = new saucesModel({
    name:req.body.name,
    manufacturer:req.body.manufacturer,
    description:req.body.description,
    heat:req.body.heat,
    likes:req.body.likes,
    dislikes:req.body.dislikes,
    imageUrl: req.body.imageUrl,
    mainPepper:req.body.mainPepper,
    usersLiked:req.body.usersLiked,
    usersDisliked:req.body.usersDisliked,
    userId:req.body.userId
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
  };



exports.createSauce = async(req, res)=>{
  const data =  req.body;
  console.log(data);
  res.send(data);
};

//function to create source
exports.createSource = async(req, res, next) => {
  //const sourceObject = JSON.parse(req,body,source);
    delete sourceObject._id;
    const saurce = new saucesModel({
      ...sourceObject,
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    await source.save()
    res.send({data:sauce}
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }))
      );
  };
  
  





exports.createSouces = async(req, res) => {
  //const sourceObject = JSON.parse(req,body,source);
  delete req.body._id;
  const sauces = new saucesModel({
    ...req.body
    
      
  });
  await sauces.save();
  console.log(sauces)
  res.send({data:sauces} 
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }))
    );}
   
//-----------------function to find a sauce-----------------------

exports.findOneSauce = async(req,res) => {
  try{
    const saurce =await saucesModel.findById(req.params.id)
    res.send({data:sauces});
  }catch{
res.status(404).send({error:"souce was not found ! "});
  }


}

//-----------------function update sauce----------------
exports.updatesauce = async(req,res) => {
  try{
    const saurce =await saucesModel.findById(req.params.id)
    object.assign(saurce,req.body);
    sauces.save();
    res.send({data:sauces});
  }catch{
res.status(404).send({error:"souce was not found ! "});
  }


}
//-----------------function delete sauce----------------
exports.deletesauce = async(req,res) => {
  try{
    const saurce = await saucesModel.findById(req.params.id)
 
    await sauces.remove();
    res.send({data:true});
  }catch{
res.status(404).send({error:"souce was not found ! "});
  }


}


  
  //delete req.body._id;
  const sauces  = new saucesModel(req.body);
  
  const sauces = new Sauces(req.body)
  await sauces.save()
  
  res.send({data:sauces})
  
  //const source = new Sources(req.body);
  //await source.save();
  //res.send ({data:source})


   
    //  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      //.catch(error => res.status(400).json({ error:'error' }));
     // next();
  

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
  */
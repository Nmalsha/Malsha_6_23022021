
//package for delete the image from the server
const fs = require('fs');

const app = require('../app');
//adding sources
const saucesModel =require ('../models/sources');







//-----------------function to Find sauces---------------

exports.findAllSouces = async(req,res)=>{
  //var allsauceObject = JSON.parse(req.body.sauce);
  const souce = await saucesModel.find()
  .then(souce => res.status(200).json(souce))
  .catch(error => res.status(400).json({error}));

  //res.send({data: souce})

       }


//-------------function to create source----------------
exports.createSauce =   (req, res,next)=>{

 var sauceObject = JSON.parse(req.body.sauce);
 console.log(sauceObject);
  delete sauceObject._id;
 
//console.log(sauceObject);
  const newsauce =  new saucesModel({
    name:sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description:sauceObject.description,
    heat:sauceObject.heat,
    likes: "0",
    dislikes:"0",
    mainPepper:sauceObject.mainPepper,
    usersLiked: [],
    usersDisliked:[],
    userId: sauceObject.userId,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
   
    );
      console.log('newsauce details');
  console.log(newsauce);
 


newsauce.save()
 .then(() => res.status(201).json({ message: 'Objet enregistré !'}))

 .catch(error =>{ res.status(400).json({ error :error});
 });
 //.catch(error => res.status(400).json({ error :error}));
 
}

//-----------------function to find a sauce-----------------------
exports.findOneSauce = async(req,res) => {
  
   const findsouce = await saucesModel.findOne({_id:req.params.id})
   // res.send({data:sauce});
   .then(findsouce => res.status(200).json(findsouce))
   .catch(error => res.status(400).json({error}));
}

//-------------function to modify source----------------
exports.modifysauce = async(req,res,nest) => {
  const modisauceObject = req.file?
  {
    ...JSON.parse(req.body.sauce),
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      
  } : {...req.body};
  saucesModel.updateOne({_id:req.params.id},{...modisauceObject, _id: req.params.id})  
  .then(() => res.status(201).json({ message: 'sauce modifié!'}))
  .catch(error =>res.status(400).json({ error :error}));
  
}


//-------------function to delete source----------------
exports.deletesauce = async(req,res) => {
  saucesModel.findOne({_id:req.params.id})
  .then(sauce =>{
    const filename = sauce.imageUrl.split('/images')[1];
    fs.unlink('images/${filename}',()=>{
      saucesModel.deleteOne({_id:req.params.id})
      .then(() => res.status(201).json({ message: 'objet supprimé!'}))
  .catch(error =>res.status(400).json({ error :error}));
    });
  })
  
 
  .catch(error =>res.status(400).json({ error :error}));
};

//-----------------function for user like dislike system-----------------------
/*
exports.likeSauce = (req,res,next) => {

  const like =req.body.like;
  switch(like){
    case 1:
      //if user like adding the like with the userId
      saucesModel.updateOne({_id:req.params.id},{$inc : {likes:  + 1},
      $push: {usersLiked :req.body.userId}
      
      })
      
.then (() => res.status(201).json({ message: 'j aime la sauce  !'}))
.catch(error =>res.status(500).json({ error :error}));
//console.log(like);
//console.log(usersLiked);
//console.log(_id);
break;

case -1 :
  //if the user doesnt like the sace , adding his unlike with the userId
  saucesModel.updateOne({_id:req.params.id},{
    $push: {usersDisliked :req.body.userId},$inc : {dislikes:  + 1}
  })
  .then (() => res.status(201).json({ message: 'j naime pas la sauce  !'}))
.catch(error =>res.status(500).json({ error :error}))
    
break;


//if the user cancel the chois, updating table with dicreasing the count of like or dislike
case 0:
  saucesModel.findOne({_id:req.params.id})
  .then (sauce =>{
    if(sauce.usersLiked.includes(req.body.userId)){
      saucesModel.updateOne({_id:req.params.id},{
        $pull :{usersLiked:req.body.userId},$inc :{likes :-1}
          
      })
      .then (() => res.status(201).json({ message: 'j aime retiré  !'}))
.catch(error =>res.status(500).json({ error :error}))

    }
    else{
      saucesModel.updateOne({_id:req.params.id},{
        $pull :{usersDisliked:req.body.userId},$inc :{dislikes :-1}
      })
      .then (() => res.status(201).json({ message: 'j naime pas retiré  !'}))
      .catch(error =>res.status(500).json({ error :error}))
    }
  })
  .catch(error =>res.status(500).json({ error :error}))
  break;
  default :console.log(req.body);
}
}
*/
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
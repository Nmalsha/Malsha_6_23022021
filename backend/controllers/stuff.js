
//package for delete the image from the server
const fs = require('fs');

const app = require('../app');
//adding sources
const saucesModel =require ('../models/sources');

//adding xss protection for the data entered by the user ( cross site scripting)
const xss = require ('xss')





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
    name:xss(sauceObject.name),
    manufacturer: xss(sauceObject.manufacturer),
    description:xss(sauceObject.description),
    heat:sauceObject.heat,
    likes: "0",
    dislikes:"0",
    mainPepper:sauceObject.mainPepper,
    usersLiked: [],
    usersDisliked:[],
    userId: xss(sauceObject.userId),
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
   
    );
      console.log('newsauce details');
  console.log(newsauce);
 


newsauce.save()
 .then(() => res.status(201).json({ message: 'Objet enregistré !'}))

 .catch(error =>{ res.status(400).json({ error :error});
 });

 
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

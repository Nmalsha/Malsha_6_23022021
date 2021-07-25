const express = require('express');
//adding mongo database
const mongoose = require('mongoose');
//adding env
const dotenv = require ('dotenv');
//adding bodyparser
const bodyParser = require('body-parser');
//adding bcryptconst 
const bcrypt = require('bcryptjs');
//adding jwt token
const jwt =require('jsonwebtoken');
//adding users
const user = require ('./models/user');
//adding sources
const sources =require ('./models/sources');
//const JWT_SECRET = '"Bearer'
const path = require('path');


const app = express();

//connection mongo DB

//dotenv.config();
mongoose.connect('mongodb+srv://malsha:Katupotha@1947@cluster0.ujzs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//mongoose.connect('mongodb://localhost:3000/signup',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Adding CORS (Cross Origin Resource Sharing,)
app.use((req, res, next) => {
  //d'accéder à notre API depuis n'importe quelle origine 
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

//--------------SIGNUP A CLIENT-----------------------------------
app.post('/api/auth/signup',async(req, res, next) => {
// console.log(req.body)

  const {email,password:plainTextPassword} =req.body
  if(!email){
    return res.json({
      status:'error',
      error:'Email filed is empty!'})
  }
  if(plainTextPassword.length<3){
    return res.json({
      status:'error',
      error:'Password too small. Should be at least 6 characters'})
  }
  // created salt with brcrypt in async
  const salt = await bcrypt.genSalt(10);
   //  created hash with brcrypt in async
const password = await bcrypt.hash(req.body.password ,salt)
   
 console.log(password);
try{
 const reponce = await user.create({
    email,
    password
  })
  console.log('user created successfully')
  console.log(reponce)
}catch(error){
//console.log(JSON.stringify(error))
if(error.code ===11000){
  //duplicate key
  return res.json({
    status:'error',
    error:'this email address already exist'})
}
throw error
}
 res.json ({status:'ok ok'})
  next();
});
//--------------FIN SIGNUP A CLIENT-----------------------------------

//--------------LOGIN A CLIENT-----------------------------------
app.post('/api/auth/login',async(req,res,next)=>{
const {email,password} = req.body

const finduser = await user.findOne({email})
//if user not exist
if (!finduser) {
  return res.json({ status:'error', error: 'Invalid username/password !' });
}
//checking if the password is correct and match
if(await bcrypt.compare(req.body.password,finduser.password)){
  //if ok sending the token
  const token = jwt.sign({ 
    id: finduser._id,
    email:finduser.email
  },
  'RANDOM_TOKEN_SECRET',
  { expiresIn: '24h' }
     )
  
     console.log('user login successfully')
     console.log(token)
  return res.json({ status:'ok', data:'token'});
}

console.log('Invalid username/password !')
res.json ({status:'error', error:'Invalid username/password !'}) 
next();
})

//function to create source
app.post ('/api/sauces',async(req, res, next) => {
  delete req.body._id;
  //const sourceObject = JSON.parse(req,body,source);
  const addSources = new sources ({
...req.body

  } )
  console.log(addSources);
  console.log('added success');
   // delete req.body._id;
    //const sourceNEWObject = new sources({
      //...sourceObject,
      //imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //});
    addSources.save()
   
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      next();
  });

module.exports = app;

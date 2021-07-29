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
//adding cors
var cors = require('cors')
//adding users
const user = require ('./models/user');
//adding sources
//const saucesModel =require ('./models/sources');
// adding route
const stuffRoutes = require ('./routes/stuff');

//adding controller
const soucesController = require('./controllers/stuff')
//const JWT_SECRET = '"Bearer'
const path = require('path');
const auth = require('./middleware/auth');
const multer = require ('./middleware/multer_config');

//connection mongo DB

//dotenv.config();
mongoose.connect('mongodb+srv://malsha:Katupotha@1947@cluster0.ujzs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//mongoose.connect('mongodb://localhost:3000/signup',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then (()=>{
      const app = express();
      app.use(express.json());

      console.log('Connexion à MongoDB réussie !')
     
      
 
    })
   
  .catch(() => console.log('Connexion à MongoDB échouée !'));





const app = express();
//Adding CORS (Cross Origin Resource Sharing,)
app.use((req, res, next) => {
  //d'accéder à notre API depuis n'importe quelle origine 
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type:application/x-www-form-urlencoded, Authorization');
  //d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 // res.setHeader('Access-Control-Allow-Credentials true');
  next();
});



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}





// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/sauces',stuffRoutes);
app.use(cors(corsOptions));




//--------------SIGNUP A CLIENT-----------------------------------
app.post('/api/auth/signup',async(req, res, next) => {
console.log(req.body)

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
   //mask the email address
  // let emailmask = buffer.toString('base64');
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
//--------------------------------TESTING -------------------------------

app.get("/sauces",soucesController.findAllSouces);
app.post("/sauces",soucesController.createSauce);

module.exports = app;

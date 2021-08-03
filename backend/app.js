const express = require('express');
//required modules
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')
// package multer for handle image files - MOVE TO ROUTE
const multer = require ('./middleware/multer_config');

//parameter for user authentification -MOVE TO USER ROUTE
const auth = require('./middleware/auth');

//adding controller _ MOVE TO STUFF ROUTES
const soucesController = require('./controllers/stuff')
const userCtrl = require('./controllers/user');

// security modules
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const dotenv = require ('dotenv');
const maskData = require('maskdata');

dotenv.config();

//adding  users model -MOVE TO USER CONTROLLER
const user = require ('./models/user');

// adding route
const stuffRoutes = require ('./routes/stuff');
const userRoutes = require ('./routes/user');

//initialisation application expesse
const app = express();

//connection mongo DB

//dotenv.config();
mongoose.connect('mongodb+srv://malsha:Katupotha@1947@cluster0.ujzs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//mongoose.connect('mongodb://localhost:3000/signup',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then (()=>{
      //const app = express();
     // app.use(express.json());

      console.log('Connexion à MongoDB réussie !')
    
    })
   
  .catch(() => console.log('Connexion à MongoDB échouée !'));


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*',cors());

//image file handling
app.use('/images',express.static(path.join(__dirname,'images')));
//Routes
app.use('/api/sauces',stuffRoutes);
app.use('/api/auth',userRoutes);








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
      email:maskData.maskEmail2(req.body.email),
      password
     
     
    })
    
    console.log('user created successfully')
    console.log(reponce)
    console.log(reponce._id)
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
    console.log(email)
    const finduser = await user.findOne({email:maskData.maskEmail2(req.body.email)})
  console.log(finduser._id)
    //if user not exist
    if (!finduser) {
      return res.json({ status:'error', error: 'Invalid username/password !' });
    }
    //checking if the password is correct and match
    if(await bcrypt.compare(req.body.password,finduser.password)){
      //if ok sending the token
      const token = jwt.sign({ 
        id: finduser._id,
        email:finduser.email,
    
      },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' }
         )
         console.log('user login successfully')
         
         
         console.log(token)
      return res.json({ status:'ok', token:token, userId:finduser._id });
    }
    
    console.log('Invalid username/password !')
    res.json ({status:'error', error:'Invalid username/password !'}) 
    next();
    })
  
  


//--------------------------------TESTING -------------------------------

//app.post('api/auth/signup',userCtrl.signup);
//app.post('/api/auth/login',auth,userCtrl.login);
app.get("/api/sauces",auth,soucesController.findAllSouces);
app.post("/api/sauces",auth,multer,soucesController.createSauce);
app.get("/api/sauces/:id",auth,soucesController.findOneSauce);
app.put("/api/sauces/:id",auth,multer,soucesController.modifysauce);
app.delete("/api/sauces/:id",auth,soucesController.deletesauce);
app.post("/api/sauces/:id/like",soucesController.likeSauce);

module.exports = app;

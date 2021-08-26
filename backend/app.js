const express = require('express');
//required modules
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')
const methodOverride =   require ('method-override');
// package multer for handle image files - MOVE TO ROUTE
const multer = require ('./middleware/multer_config');

//parameter for user authentification -MOVE TO USER ROUTE
const auth = require('./middleware/auth');

//adding controller _ MOVE TO STUFF ROUTES

const userCtrl = require('./controllers/user');

// security modules
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const dotenv = require ('dotenv');
const maskData = require('maskdata');

const envCfg = dotenv.config();

//adding  users model -MOVE TO USER CONTROLLER
const user = require ('./models/user');

// adding route
const stuffRoutes = require ('./routes/sauce');
const userRoutes = require ('./routes/user');

//initialisation application expesse
const app = express();

//connection mongo DB

mongoose.connect(envCfg.parsed.MongoDB_URL,

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
//CORS
app.use(cors());
app.options('*',cors());


//image file handling
app.use('/images',express.static(path.join(__dirname,'images')));
//Routes
app.use('/api/sauces',stuffRoutes);
app.use('/api/auth',userRoutes);
//app.use(methodOverride('_method'));




module.exports = app;
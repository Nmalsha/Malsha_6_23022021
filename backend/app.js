const express = require('express');
//adding mongo database
const mongoose = require('mongoose');
//adding bodyparser
const bodyParser = require('body-parser');
//adding bcryptconst 
const bcrypt = require('bcrypt');
//adding users
const user = require ('./models/user');

const path = require('path');

const app = express();

//connection mongo DB
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





app.use('/api/auth/signup',async(req, res, next) => {
  console.log(req.body)

  const {email,password:plainTextpassword} =req.body
  //const password = await bcrypt.hash(password,10)
  //console.log (await bcrypt.hash(password,10))

  res.json ({status:'ok'})
  next();
});
/*
app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;


const express = require('express');
const bodyParser = require('body-parser');
//adding mongo database
const mongoose = require('mongoose');
const path = require('path');

//const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
//connection mongo DB
mongoose.connect('mongodb+srv://malsha:Katupotha@1947@cluster0.ujzs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();

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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use ('/api/sauces',stuffRoutes );
app.use ('/api/auth',userRoutes );
*/
module.exports = app;

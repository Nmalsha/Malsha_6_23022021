
//package bcrypt for password protection
const bcrypt = require('bcrypt');
//Json web token
const jwt =require('jsonwebtoken');

const users = require ('../models/user');

const signup = (req,res,next)=>{
  bcrypt.hash(req.body.password, 10 ,function(err,hashpass){
if(err){
res.json({
  erroe:err
})
}
let user = new user({
  email: req.body.email,
  password: hashpass
})

user.save()
.then(user =>{
  res.json({
    message: 'Utilisateur créé !'
  })
})
.catch(user =>{
  res.json({
    message: 'error !'
  })
})
  })

}

module.exports = {
  signup
}


/*
exports.signup = (req,res,next)=>{

//hash the password
bcrypt.hash(req.body.password, 10)
.then(hash => {
  const user = new User({
    email: req.body.email,
    password: hash
  });
  //save the user in to the DB
  user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));

};
exports.login = (req,res,next)=>{
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
*/
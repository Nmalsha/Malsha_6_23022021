
//adding users
const User = require ('../models/user');

const app = require('../app');

//Json web token
const jwt =require('jsonwebtoken');

//adding bcryptconst for password protection
const bcrypt = require('bcryptjs');

const maskData = require('maskdata');

/*


//--------------SIGNUP A CLIENT-----------------------------------

exports.signup = async(req, res, next) => {

  
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
 
  try{
   
   const reponce = await user.create({
      email:maskData.maskEmail2(req.body.email),
      password
     
     
    })
  
  }catch(error){
  
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
  };
  
  //--------------FIN SIGNUP A CLIENT-----------------------------------
  
  //--------------LOGIN A CLIENT-----------------------------------
  exports.login = async(req,res,next)=>{
    const {email,password} = req.body
   
    const finduser = await user.findOne({email:maskData.maskEmail2(req.body.email)})
  
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
      
      return res.json({ status:'ok', token:token, userId:finduser._id });
    }
    
    console.log('Invalid username/password !')
    res.json ({status:'error', error:'Invalid username/password !'}) 
    next();
    };
  
  */


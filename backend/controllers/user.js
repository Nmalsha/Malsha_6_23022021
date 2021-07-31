const express = require('express');
const app = require('../app');
//adding users
const user = require ('../models/user');
//Json web token
const jwt =require('jsonwebtoken');
//adding bodyparser
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//adding bcryptconst 
const bcrypt = require('bcryptjs');
/*
exports.signup = async(req, res, next) => {
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
  }
exports.login = async(req,res,next)=>{
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
      email:finduser.email,
    
    },
    'RANDOM_TOKEN_SECRET',
    { expiresIn: '24h' }
       )
       console.log(finduser._id)
       console.log('user login successfully')
       console.log(token)
    return res.json({ status:'ok', data:'token'});
  }
  
  console.log('Invalid username/password !')
  res.json ({status:'error', error:'Invalid username/password !'}) 
  next();
  }

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
    const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password ,salt)
     // created salt with brcrypt in async
     //const salt = await bcrypt.genSalt(10);
     //  created hash with brcrypt in async
    //const hash = await bcrypt.hash(req.body.password, salt);
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
  */
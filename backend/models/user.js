const mongoose = require('mongoose');
//to use a unique email
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
 // _id:{ type: String, required: true }, 
    //token:{ type: String, required: true }
  
},
{collection:'user'}
);


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user',userSchema);
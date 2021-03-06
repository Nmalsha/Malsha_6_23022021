const mongoose = require('mongoose');

const soucesSchema = mongoose.Schema({
   
    name: {type:String, required:true},
    manufacturer: {type:String, required:true},
    description: {type:String, required:true},
    heat:{type:Number, required:true},
 likes:{type:Number, required:true},
    dislikes:{type:Number, required:true},
    imageUrl: {type:String, required:true},
    mainPepper:{type:String, required:true},
    usersLiked:{type:Array, required:true},
    usersDisliked:{type:Array, required:true},
    userId:{type:String, required:true}
   
},
{collection:'sauces'});
module.exports = mongoose.model('sauces',soucesSchema);
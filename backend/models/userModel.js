
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://shinderiya23jan:riyaa@codefusion.tzn4kgb.mongodb.net/?retryWrites=true&w=majority&appName=CodeFusion');


let userSchema = new mongoose.Schema({
   name:String,
   username:String,
   email:String,
   password:String,
    date:{
    type:Date,
    default:Date.now
   },
   isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('User',userSchema );


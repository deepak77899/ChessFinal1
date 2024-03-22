const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // References to other users
});

userSchema.methods.generateAuthToken =async function(next){
  try{
     const token=jwt.sign({username:this.username,email:this.email},process.env.JWT_SECRET);
     return token;
  }catch(e){
      console.log("the error occurred generate auth token function"+e);
      throw 501;
  }
};
const User = mongoose.model('User', userSchema);

module.exports = User;
const jwt = require('jsonwebtoken')
require("dotenv").config();
exports.auth = async (req, res, next) => {

  try {
    //extract token
    const token = req.cookies.token;
    console.log("tookie dekhlo frndz",token)
    if(!token){
     return res.status(401).send('cookie expired in auth');
    }
    console.log("cookies in auth \n"+token);

   try {
    var verifyUser = jwt.verify(
      token,
      process.env.JWT_SECRET
    )
   } catch (error) {
     return res.status(401).send("invalid token")
   }
    req.body.email=verifyUser.email;
    req.body._id=verifyUser._id;
    req.body.username=verifyUser.username;
    next();
  } catch (error) {
     return res.status(400).send("Unauthorized request ye");
  }
}


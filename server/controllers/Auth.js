const user=require("../Models/User")
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        console.log(email + password);
        const User = await user.findOne({email});
        console.log(User);
        if(!User){
            return res.status(401).send("email not registered");
        }
        const isMatch=await bcrypt.compare(password,User.password);
        console.log(isMatch);
        const token= await User.generateAuthToken();
        console.log("token from user login \n "+token+"\n");
        if(isMatch){
            const options = {
				expires: new Date(Date.now() +   15 * 60 * 60 * 1000),
				httpOnly: true,
                path: "/",
                sameSite: 'none',
                // secure:true//but have to change to trure on production
			};
        // we are storing cookie in jwtoken and it will expires in 30days
        res.cookie('token', token, options);
        User.password="";
        User.friends=[];
        res.status(200).json({User,success:true});
        }else{
            res.status(401).json({success:false,message:"invalid username or password"});
        }
    } catch (error) {
        res.status(404).json({success:false,error});
    }
}
const userSignup=async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success:false,message: 'User already exists' });
      }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      // Create a new user instance
      const newUser = new user({ username, email, password:hashedPassword });
  
      // Save the user to the database
      await newUser.save();
  
      // Generate authentication token
      const token = await newUser.generateAuthToken();
  
      // Send the token as a response
      res.status(201).json({success:true, token });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({
        success:false, message: 'Internal Server Error' });
    }
  }
  
  const userLogout = async(req,res)=>{
      try{
       const token = req.cookies.token;
       console.log('logout token \n');
       console.log(token);
       if (!token) {
        return res.status(400).json('cookie expired you can log out');
    }
       
          jwt.verify(
            token,
            process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json("auth failed in logout token");
                }

                res.clearCookie('token');
                console.log("logged out successfully");
                return res.status(200).json({ "message": "Sucessfully logged out" });
            })
   
      }catch(err){
            console.log(err);
            return res.status(500).json({"message":"error in logout"});
      }
   };
module.exports={userLogin,userSignup,userLogout};


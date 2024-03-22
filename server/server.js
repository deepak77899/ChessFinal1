const express = require('express')
const app = express()
const router=require('./Routes/router')
const cors= require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());  
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({      //* cros-origin-scripting
    origin: "*",
    credentials: true,
}));
app.use("/",router)
require("dotenv").config();
require("./config/database").connect();

app.listen(PORT,()=>{
    console.log("app is listening at"+PORT);
})
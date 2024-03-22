const express = require('express')
const app = express()
const router=require('./Routes/router')

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use("/v1",router)
require("dotenv").config();
require("./config/database").connect();

app.listen(PORT,()=>{
    console.log("app is listening at"+PORT);
})
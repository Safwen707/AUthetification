const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const userRoute =require('./routes/user')//importation de route
const roleRoute =require('./routes/role')
const linkDatabase = require('./config/db')
app.use(express.json());


app.use('/user',userRoute); //utilisation de route
app.use('/role',roleRoute);
app.listen(3000,()=>{
    console.log("connected")
});

linkDatabase();
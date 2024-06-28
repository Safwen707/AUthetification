const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const userRoute =require('./routes/user')//importation de route
const roleRoute =require('./routes/role')
const permissionRoute =require('./routes/permission')
const linkDatabase = require('./config/db')

app.use(express.json());


const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use('/user',userRoute); //utilisation de route
app.use('/role',roleRoute);
app.use('/permission',permissionRoute);
app.listen(3000,()=>{
    console.log("connected")
});

linkDatabase();
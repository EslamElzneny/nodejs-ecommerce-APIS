require('dotenv').config()
const { configDotenv } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.route');
const app = express();

const url = process.env.MONGO_DB_HOST + process.env.MONGO_DB_NAME;

mongoose.connect(url).then(()=>{
    console.log("Connected successfully to server...");
})

app.use(express.json());
app.use('/api/users',userRouter);

const port = process.env.MONGO_DB_PORT || 3001;
app.listen(port,()=>{
    console.log("Backend server is running on :" + port);
})


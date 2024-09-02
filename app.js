import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.route.js';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors';
import path from 'path';
import { httpResp } from './utils/httpResponse.js';
import { fileURLToPath } from 'url';
const app = express();

const url = process.env.MONGO_DB_HOST + process.env.MONGO_DB_NAME;

mongoose.connect(url).then(()=>{
    console.log("Connected successfully to server...");
})

// Get the current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public',express.static(path.join(__dirname,'public')))
app.use(cors());

app.use(express.json());
app.use('/api',authRouter);
app.use('/api/users',userRouter);

// global middleware for not found
app.all('*',(req,res)=>{
    res.status(404).json(httpResp.error('This resource is not available!'));
});

app.use((err,req,res,next)=>{
    res.status(err.statusCode).json(httpResp.general(err.message,err.statusText,err.statusCode));
})

const port = process.env.MONGO_DB_PORT || 3001;
app.listen(port,()=>{
    console.log("Backend server is running on :" + port);
})


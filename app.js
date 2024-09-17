import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './routes/api.route.js';
import { DB_connection } from './config/database.js';
const app = express();
DB_connection()

// Get the current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public',express.static(path.join(__dirname,'public')))
app.use(cors());

app.use(express.json());
app.use('/api',apiRouter);

const port = process.env.MONGO_DB_PORT || 3001;
app.listen(port,()=>{
    console.log("Backend server is running on :" + port);
})


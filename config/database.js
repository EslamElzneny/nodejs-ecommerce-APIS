
import mongoose from 'mongoose';
import { _EventEmitter } from './eventEmitter.js';
import { _BaseSeeder } from '../utils/seeders/baseSeeder.js';
const url = process.env.MONGO_DB_HOST + process.env.MONGO_DB_NAME;

export const DB_connection = () => {
    mongoose.connect(url).then((e)=>{
        console.log("Connected successfully to server...");
        _BaseSeeder.run();
        _EventEmitter.emit('db_connect',e.modelNames());
    }).catch((err)=>{
        console.error("Something error connection happens!");
        process.exit();
    })
}

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    color:{
        type:Array,
        required:false
    },
    size:{
        type:Array,
        required:false 
    },
    created_at:{
        type:Date,
        required:false
    }
});

export const Product = mongoose.model('Product',productSchema); 

import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        searchable:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Email must be valid'],
        searchable:true
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:false
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }
},{timestamps:true});

userSchema.pre(['findOne'],function(next){
    this.populate([{path:'role'}]);
    next();
});


export const User = mongoose.model('User',userSchema);

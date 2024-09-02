import mongoose from "mongoose";
import validator from "validator";
import { UserRole } from "../utils/enums/userRole.enum.js";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true    
    },
    email:{
        type: String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Email must be valid']
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
        type:String,
        enum: Object.keys(UserRole),
        default: UserRole.DEFAULT
    },
    created_at:{
        type:Date,
        required:false
    }
});

export const User = mongoose.model('User',userSchema);

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address:{
        type:String,
        required:[true,'Address is required!']
    },
    country:{
        type:String,
        required:[true,'Country is required!']
    },
    governorate:{
        type:String,
        required:[true,'Governorate is required!']
    },
    city:{
        type:String,
        required:[true,'City is required!']
    },
    postal_code:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

export const Address = mongoose.model('Address',addressSchema);

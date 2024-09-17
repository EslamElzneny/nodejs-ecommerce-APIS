import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name permission is require"],
        unique: true,
    }
});

export const Permission = mongoose.model('Permission',permissionSchema);

import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,"Name rule is require"],
        searchable:true
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Permission'
        }
    ]
});

roleSchema.pre(/^find/,function(next){
    this.populate([{path:'permissions',select:'name'}]);
    next();
});

export const Role = mongoose.model('Role',roleSchema);

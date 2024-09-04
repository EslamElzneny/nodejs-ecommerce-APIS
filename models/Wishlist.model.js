import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:[true,'Product is required']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User is required']
    }
},{timestamps:true});

wishlistSchema.index({product:1,user:1},{unique:true}); // 1 indicates the sort order (ascending)

wishlistSchema.pre(/^find/,function(next){
    this.populate([{path:'product'}]);
    next();
});


export const Wishlist = mongoose.model('Wishlist',wishlistSchema);

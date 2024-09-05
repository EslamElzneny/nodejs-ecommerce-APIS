import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    cartItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:[true,'Product id is required']
            },
            price:{
                type:Number,
                required:[true,'Product price is required']
            },
            product_name:{
                type:String,
                required:[true,'Product name is required']
            },
            quantity:{
                type:Number,
                default:1
            },
            color:String,
            size:String
        }
    ],
    totalCartPrice:Number,
    totalPriceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User id is required']
    }
},{timestamps:true});

export const Cart = mongoose.model('Cart',cartSchema);

import mongoose from 'mongoose'
import { PayMethods } from '../utils/enums/paymentMethods.enum.js';
import { OrderStatus } from '../utils/enums/orderStatus.enum.js';

const orderSchema = new mongoose.Schema({
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
    taxPrice: {
        type: Number,
        default: 0,
    },
    shoppingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    shippingPrice: {
        type: Number,
        default: 0,
    },
    totalOrderPrice:Number,
    paymentMethodType: {
        type: String,
        enum: PayMethods.ENUM,
        default: PayMethods.CASH,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: Date,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User id is required']
    },
    status:{
        type:String,
        enum:OrderStatus.ENUM,
        default:OrderStatus.DEFAULT
    }
},{timestamps:true});

export const Order = mongoose.model('Order',orderSchema);

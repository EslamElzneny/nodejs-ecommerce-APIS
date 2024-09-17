import mongoose from  'mongoose';

const couponSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, 'Coupon name required'],
        unique: true,
    },
    expire: {
        type: Date,
        required: [true, 'Coupon expire time required'],
    },
    discount: {
        type: Number,
        required: [true, 'Coupon discount value required'],
    },
    type:{
        type:String,
        enum:['amount','percentage'],
        default:'amount'
    }
});

export const Coupon = mongoose.model('Coupon',couponSchema);

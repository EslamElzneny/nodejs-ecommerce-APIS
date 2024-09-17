import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
        searchable:true
    },
    price:{
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
    },
    quantity:{
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    description:{
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Too short product description'],
        searchable:true
    },
    color:[String],
    size:[String],
    category:{
        required: [true, 'Category is required'],
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
},{timestamps:true});

productSchema.set('toJSON', 
    {
        virtuals: true,
        versionKey: false,
        transform: function(doc, ret) {
          delete ret.__v;
          ret.slug = ret.title.toLowerCase().replaceAll(' ','-')
          return ret;
        }
    }
);

productSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'category',
      select:'name'
    });
    next();
});

export const Product = mongoose.model('Product',productSchema); 

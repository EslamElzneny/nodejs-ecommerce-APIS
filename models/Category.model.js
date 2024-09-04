import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be unique'],
        minlength: [3, 'Too short category name'],
        maxlength: [32, 'Too long category name'],
    },
    image: String,
},{timestamps:true});

// categorySchema.virtual('slug').get(function() {
//     return this.name.toLowerCase().replaceAll(' ','-');
// });
// Ensure virtual are included in JSON responses
categorySchema.set('toJSON', 
    {
        virtuals: true,
        versionKey: false,  // Remove __v
        transform: function(doc, ret) {
          delete ret.__v;
          ret.slug = ret.name.toLowerCase().replaceAll(' ','-')
          return ret;
        }
    }
);

export const Category = mongoose.model('Category',categorySchema);

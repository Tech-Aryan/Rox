import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    sold: { type: Boolean, required: true },
    dateOfSale: { type: Date, required: true } 
});


const Product = mongoose.model("Product", productSchema);

export default Product;

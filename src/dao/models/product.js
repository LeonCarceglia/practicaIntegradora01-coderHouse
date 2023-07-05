import mongoose from "mongoose"

const productsCollection = "products"
const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: Number,
        unique: true
    },
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number,
    category: String,
    thumbnails: Array
})

const productModel = mongoose.model(productsCollection, productsSchema)
export default productModel
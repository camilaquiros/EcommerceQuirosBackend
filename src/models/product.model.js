import mongoose from "mongoose";

const productCollection = 'products';

//definir schemas
const stringUniqueRequired = {
    type: String,
    unique: true,
    required: true
}

const stringRequired = {
    type: String,
    required: true
}

const numberRequired = {
    type: Number,
    required: true
}

const productSchema = new mongoose.Schema({
    title: stringRequired,
    description: stringRequired,
    code: stringUniqueRequired,
    price: numberRequired,
    stock: numberRequired,
    category: stringRequired,
    thumbnails: stringRequired
})

export const productModel = mongoose.model(productCollection, productSchema)
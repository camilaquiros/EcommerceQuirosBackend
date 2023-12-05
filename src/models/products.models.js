import {Schema, model} from "mongoose";

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

const productSchema = new Schema({
    title: stringRequired,
    description: stringRequired,
    code: stringUniqueRequired,
    price: {
        type: Number,
        required: true,
        index: true   
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        index: true   
    },
    category:  {
        type: String,
        required: true,
        index: true
    },
    thumbnails: {
        type: String
    },
})

export const productModel = model('products', productSchema)

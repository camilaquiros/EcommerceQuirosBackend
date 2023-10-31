import {Schema, model} from "mongoose";
import { cartModel } from "./carts.models.js";

//definir schemas
const stringRequired = {
    type: String,
    required: true
}

const userSchema = new Schema({
    first_name: stringRequired,
    last_name: stringRequired,
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: stringRequired,
    rol: {
        type: String,
        default: 'user'
    },
    age: {
        type: Number,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId, //Id autogenerado de MongoDB
        ref: 'carts',
    }
})

userSchema.pre('save', async function(next) {
    if (!this.cart) {
        try {
            const newCart = await cartModel.create({})
            this.cart = newCart._id
        } catch (error) {
            next(error)
        }
    }else{

    }
})

export const userModel = model('users', userSchema)
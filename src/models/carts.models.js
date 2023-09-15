import {Schema, model} from "mongoose";

const cartSchema = Schema({
    products: {
        type:[{
            id_prod: {
                type: Schema.Types.ObjectId, //Id autogenerado de MongoDB
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true //default: 1 (otra forma de hacerlo)
            }
        }],
        default: function() {
            return []
            }
        }
    }
)

export const cartModel = model('carts', cartSchema)

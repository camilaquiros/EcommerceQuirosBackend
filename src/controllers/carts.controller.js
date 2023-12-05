import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

export const getCart = async(req, res) => {
    const { cid } = req.params
    try {
        const prods = await cartModel.findById(cid).populate('products.id_prod')
        res.status(200).send({resultado: 'OK', message: prods})
    } catch (error) {
        res.status(400).send({error: `No se pudo obtener carrito con Mongoose: ${error}`})
    }
}

export const putCart = async(req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if(cart){
            const prod = cart.products.findIndex(product => product.id_prod._id == pid)
            const prodStock = await productModel.findById(pid)
            if(prod == -1) {
                if (quantity <= prodStock.stock) {
                    cart.products.push({id_prod: pid, quantity: quantity})
                    const respuesta = await cartModel.findByIdAndUpdate(cid, cart).populate('products.id_prod')
                    res.status(200).send({resultado: 'OK', message: cart});
                } else {
                    res.status(400).send({message: 'La cantidad supera al stock actual'})
                }
            } else {
                cart.products[prod].quantity += quantity
                if (cart.products[prod].quantity + quantity <= prodStock.stock) {
                    const respuesta = await cartModel.findByIdAndUpdate(cid, cart).populate('products.id_prod')
                    res.status(200).send({resultado: 'OK', message: cart});
                } else {
                    res.status(400).send({message: 'La cantidad supera al stock actual'})
                }
            }
        }
    } catch (error) {
        res.status(400).send({error: `No se pudo agregar producto al carrito: ${error}`})
    }
}

export const deleteProductCart = async(req, res) => {
    const { cid, pid } = req.params
    try {
        let cart = await cartModel.findById(cid);
        if(cart){
            const prod = cart.products.findIndex(prod => prod.id_prod._id == pid)
            if(prod != -1){
                cart.products.splice(prod, 1)
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(202).send({resultado: 'OK', message: cart});
            } else{
                res.status(404).send({resultado: 'Not Found', message: 'Este producto no se encuentra en el carrito'})
            }
        } else{
            res.status(404).send({resultado: 'Not Found'})
        }
    } catch (error) {
        res.status(500).send({error: `No se pudo eliminar producto con Mongoose: ${error}`})
    }
}

export const deleteCart = async(req,res) => {
    const { cid } = req.params
    try {
        let cart = await cartModel.findById(cid);
        if(cart){
            cart.products.splice(0, cart.products.length);
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(202).send({resultado: 'OK', message: cart});
        }else{
            res.status(404).send({resultado: 'Not Found', message: cart})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo eliminar producto con Mongoose: ${error}`})
    }
}
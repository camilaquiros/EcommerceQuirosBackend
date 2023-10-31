import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

export const postCart = async(req, res) => {
    try {
        const newCart = cartModel.create({});
        res.status(200).send({ resultado: 'OK', message: newCart });
    } catch (error) {
        res.status(400).send({ error: `Error al crear carrito: ${error}` });
    }
}
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
            const prod = cart.products.findIndex(prod => prod.id_prod == pid)
            const prodStock = await productModel.findById(pid)
            if(prod == -1) {
                if (quantity <= prodStock.stock) {
                    cart.products.push({id_prod: pid, quantity: quantity})
                    const respuesta = await cartModel.findByIdAndUpdate(cid, cart).populate('products.id_prod')
                    res.status(200).send({resultado: 'OK', message: respuesta});
                } else {
                    res.status(418).send({message: 'La cantidad supera al stock actual'})
                }
            } else {
                cart.products[prod].quantity += quantity
                if (cart.products[prod].quantity + quantity <= prodStock.stock) {
                    const respuesta = await cartModel.findByIdAndUpdate(cid, cart).populate('products.id_prod')
                    res.status(200).send({resultado: 'OK', message: respuesta});
                } else {
                    res.status(418).send({message: 'La cantidad supera al stock actual'})
                }
            }
        }
    } catch (error) {
        res.status(400).send({error: `No se pudo agregar producto al carrito: ${error}`})
    }
}

export const putArrayCart = async(req, res) => {
    const { cid } = req.params
    const products = req.body
    try {
        const cart = await cartModel.findById(cid)
        if(!cart){
            res.status(404).send({resultado:"no existe el carrito"})	
        }
        products.forEach(async product => {
            const prod = await cart.products.find(prod => prod.id_prod._id == product.id_prod);
            if(prod == -1) {
                cart.products.push(product)
            } else {
                prod.quantity += product.quantity
            }
        });
        const respuesta = await cartModel.findByIdAndUpdate(cid, cart).populate('products.id_prod')
        res.status(200).send({resultado: 'OK', message: respuesta});

        
    } catch (error) {
        res.status(500).send({error: `No se pudo actualizar producto con Mongoose: ${error}`})
    }
}

export const deleteProductCart = async(req, res) => {
    const { cid, pid } = req.params
    try {
        let cart = await cartModel.findById(cid);
        if(cart){
            const prod = cart.products.findIndex(prod => prod.id_prod == pid)
            if(prod != -1){
                cart.products.splice(prod, 1)
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(202).send({resultado: 'OK', message: respuesta});
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
            res.status(202).send({resultado: 'OK', message: respuesta});
        }else{
            res.status(404).send({resultado: 'Not Found', message: cart})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo eliminar producto con Mongoose: ${error}`})
    }
}
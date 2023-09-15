import { Router } from "express";
import { cartModel } from "../models/carts.models.js";

const cartRouter = Router();

//GET
cartRouter.get('/:cid', async(req, res) => {
    const { cid } = req.params
    try {
        const prods = await cartModel.findById(cid)
        res.status(200).send({resultado: 'OK', message: prods})
        console.log(products)
    } catch (error) {
        res.status(400).send({error: `No se pudo obtener carrito con Mongoose: ${error}`})
    }
})

//POST
cartRouter.post('/:cid/products/:pid', async(req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if(cart){
            cart.products.push({id_prod: pid, quantity: quantity})
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({resultado: 'OK', message: respuesta});
        }
    } catch (error) {
        res.status(400).send({error: `No se pudo agregar producto al carrito: ${error}`})
    }
})

//PUT
cartRouter.put('/:cid', async(req,res) => {
    const { cid } = req.params
    const {quantity} = req.body;
    try {
        let prod = await cartModel.findByIdAndUpdate(cid, {quantity});
        if(prod){
            res.status(202).send({resultado: 'OK', message: prod});
        }else{
            res.status(404).send({resultado: 'Not Found', message: prod})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo actualizar producto con Mongoose: ${error}`})
    }
})

//PUT SOLO CANTIDAD
cartRouter.put('api/carts/:cid/products/:pid', async(req,res) => {
    const { cid, pid } = req.params
    const {quantity} = req.body;
    try {
        let prod = await cartModel.findByIdAndUpdate(pid, {quantity});
        if(prod){
            res.status(202).send({resultado: 'OK', message: prod});
        }else{
            res.status(404).send({resultado: 'Not Found', message: prod})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo actualizar producto con Mongoose: ${error}`})
    }
})

//DELETE PRODUCTO DEL CARRITO
cartRouter.delete('/:cid/products/:pid', async(req,res) => {
    const { cid, pid } = req.params
    try {
        let prod = await cartModel.findByIdAndDelete(pid);
        if(prod){
            res.status(202).send({resultado: 'OK', message: prod});
        }else{
            res.status(404).send({resultado: 'Not Found', message: prod})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo eliminar producto con Mongoose: ${error}`})
    }
})

//DELETE CARRITO ENTERO
cartRouter.delete('/:cid', async(req,res) => {
    const { cid } = req.params
    try {
        let prod = await cartModel.findByIdAndDelete(cid);
        if(prod){
            res.status(202).send({resultado: 'OK', message: prod});
        }else{
            res.status(404).send({resultado: 'Not Found', message: prod})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo eliminar producto con Mongoose: ${error}`})
    }
})

export default cartRouter;
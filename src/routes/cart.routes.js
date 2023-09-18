import { Router } from "express";
import { cartModel } from "../models/carts.models.js";

const cartRouter = Router();

//DELETE PRODUCTO DEL CARRITO
cartRouter.delete('/:cid/products/:pid', async(req,res) => {
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
})

//GET
cartRouter.get('/:cid', async(req, res) => {
    const { cid } = req.params
    try {
            const prods = await cartModel.findById(cid)
            res.status(200).send({resultado: 'OK', message: prods})

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
            const prod = cart.products.findIndex(prod => prod.id_prod == pid)
            if(prod == -1) {
                cart.products.push({id_prod: pid, quantity: quantity})
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({resultado: 'OK', message: respuesta});
            } else {
                res.status(404).send({resultado: 'Not Found', message: 'Este producto ya se encuentra en el carrito'})
            }

        }
    } catch (error) {
        res.status(400).send({error: `No se pudo agregar producto al carrito: ${error}`})
    }
})

//PUT ARRAY DE PRODUCTOS
// cartRouter.put('/:cid', async(req,res) => {
//     const { cid } = req.params
//     const {products} = req.body;
//     try {
//         const cart = await cartModel.findById(cid)
//         if(cart){
//             products.forEach(async product => {
//                 const prod = cart.products.findIndex(prod => prod.id_prod == product.id_prod)
//                 if(prod == -1) {
//                     cart.products.push({id_prod: product.id_prod, quantity: quantity})
//                     const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
//                     res.status(200).send({resultado: 'OK', message: respuesta});
//                 } else {
//                     res.status(404).send({resultado: 'Not Found', message: 'Este producto ya se encuentra en el carrito'})
//                 }
//             });
//         }
        
//     } catch (error) {
//         res.status(500).send({error: `No se pudo actualizar producto con Mongoose: ${error}`})
//     }
// })

//PUT SOLO CANTIDAD
cartRouter.put('/:cid/products/:pid', async(req,res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if(cart){
            const prod = cart.products.findIndex(prod => prod.id_prod == pid)
            if(prod != -1) {
                cart.products[prod].quantity += quantity
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send({resultado: 'OK', message: respuesta});
            }else {
                res.status(404).send({resultado: 'Not Found', message: 'Este producto no esta en el carrito'})
            }

        }
    } catch (error) {
        res.status(400).send({error: `No se pudo agregar producto al carrito: ${error}`})
    }
})


//DELETE CARRITO ENTERO
cartRouter.delete('/:cid', async(req,res) => {
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
})

export default cartRouter;
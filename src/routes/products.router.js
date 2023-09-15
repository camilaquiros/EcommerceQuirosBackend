import { Router } from "express";
import { productModel } from "../models/product.model.js";

const router = Router();

//GET
router.get('/', async(req, res) => {
    try {
        let products = await productModel.find()
        console.log(products)
    } catch (error) {
        console.error("No se pudo obtener productos con Mongoose:" + error);
        res.status(500).send({error: 'No se pudo obtener productos con Mongoose', message: error})
    }
})

//POST
router.post('/', async(req, res) => {
    try {
        let {title, description, code, price, status, stock, category, thumbnails} = req.body;
        let product = await productModel.create({title, description, code, price, status, stock, category, thumbnails});
        res.status(201).send(product);
    } catch (error) {
        console.error("No se pudo obtener productos con Mongoose:" + error);
        res.status(500).send({error: 'No se pudo obtener productos con Mongoose', message: error})
    }
})

//PUT
router.put('/:id', async(req,res) => {
    try {
        let productUpdated = req.body;
        let product = await productModel.updateOne({_id: req.params.id}, productUpdated);
        res.status(202).send(product);
    } catch (error) {
        console.error("No se pudo obtener productos con Mongoose:" + error);
        res.status(500).send({error: 'No se pudo obtener productos con Mongoose', message: error})
    }
})

//DELETE


export default router;
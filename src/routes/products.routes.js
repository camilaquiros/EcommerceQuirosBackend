import { Router } from "express";
import { productModel } from "../models/products.models.js";

const productRouter = Router();

//GET
productRouter.get('/', async(req, res) => {
    const {limit, page, sort, category, status} = req.query;

    const numberLimit = limit || 10
    const numberPage = page || 1
    const sorted = sort ==='asc' || sort === 'desc' ? sort : null

    const query = {}
    if (category) query.category = category
    if (status) query.status = status

    try {
        const prod = await productModel.paginate(query, { limit: numberLimit, page: numberPage, sort: { price: sorted } });
        res.status(200).send({ resultado: 'OK', message: prod });
    } catch (error) {
        res.status(400).send({error: `No se pudo obtener productos con Mongoose: ${error}`})
    }
})

//POST
productRouter.post('/', async(req, res) => {
    const {title, description, code, price, stock, category} = req.body;
    try {
        const respuesta = await productModel.create({title, description, code, price, stock, category});
        res.status(200).send({resultado: 'OK', message: respuesta});
    } catch (error) {
        res.status(400).send({error: `No se pudo crear producto con Mongoose: ${error}`})
    }
})

//PUT
productRouter.put('/:id', async(req,res) => {
    const { id } = req.params
    const {title, description, code, price, stock, category, status} = req.body;
    try {
        let prod = await productModel.findByIdAndUpdate(id, {title, description, code, price, stock, category, status});
        if(prod){
            res.status(202).send({resultado: 'OK', message: prod});
        }else{
            res.status(404).send({resultado: 'Not Found', message: prod})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo actualizar producto con Mongoose: ${error}`})
    }
})

//DELETE
productRouter.delete('/:id', async(req,res) => {
    const { id } = req.params
    try {
        let prod = await productModel.findByIdAndDelete(id);
        if(prod){
            res.status(202).send({resultado: 'OK', message: prod});
        }else{
            res.status(404).send({resultado: 'Not Found', message: prod})
        }
        
    } catch (error) {
        res.status(500).send({error: `No se pudo eliminar producto con Mongoose: ${error}`})
    }
})

export default productRouter;
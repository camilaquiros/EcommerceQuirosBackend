import { productModel } from "../models/products.models.js";
import CustomError from '../services/CustomError.js'
import EErrors from "../services/enums.js";
import { generateProductErrorInfo } from "../services/info.js";
import { logger } from '../utils/logger.js'
import { __dirname } from "../path.js";

export const getProducts = async(req, res) => {
    const {category, status} = req.query;
    const query = {}
    if (category) query.category = category 
    if (status) query.status = status
    try {
        const products = await productModel.find(query)
        if (products) {
            res.status(200).send(products)
        }else {
            res.status(404).send({error: "Productos no encontrados"})
        }
    } catch (error) {
        res.status(500).send({error: `Error en consultar productos: ${error}`})
    }
}

export const getProduct = async(req, res) => {
    const {id} = req.params
    try {
        const product = await productModel.findById(id)
        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        res.status(500).send({error: `Error en consultar producto: ${error}`})
    }
}

export const postProduct = async(req, res) => {
    const {title, description, code, price, stock, category} = req.body;
    try {
        if (!title || !description || !code || !price || !stock || !category) {
            CustomError.createError({
                name:"Error de creacion de producto",
                cause: generateProductErrorInfo({title, description, code, price, stock, category}),
                message: "Hay campos incompletos en el formulario",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        const product = await productModel.create({ title, description, code, price, stock, category })
        return res.status(201).send(product)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({ error: `Codigo de producto ya existente` })
        } else {
            logger.error(error.cause)
            res.send({status:"error", error:error.name})
        }
    }
}

export const postProductWithImage = async(req, res) => {
    const file = req.file;
    const {title, description, code, price, stock, category} = req.body;
    try {
        if (!title || !description || !code || !price || !stock || !category) {
            CustomError.createError({
                name:"Error de creacion de producto",
                cause: generateProductErrorInfo({title, description, code, price, stock, category}),
                message: "Hay campos incompletos en el formulario",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        const product = await productModel.create({ title, description, code, price, stock, category, thumbnails: `${__dirname}/../public/img/${file.filename}`})
        return res.status(201).send(product)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({ error: `Codigo de producto ya existente` })
        } else {
            logger.error(error.cause)
            res.send({status:"error", error:error.name})
        }
    }
}

export const putProduct = async(req, res) => {
    const {id} = req.params
    const {title, description, code, price, stock, category, status} = req.body;
    try {
        const product = await productModel.findByIdAndUpdate(id, {title, description, code, price, stock, category, status});
        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({error: `Codigo de producto ya existente`})
        } else {
            res.status(500).send({error: `Error al modificar producto: ${error}`})
        }
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params
    try {
        const product = await productModel.findByIdAndDelete(id);
        if (product) {
            res.status(200).send({message:`${product.title} eliminado`})
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        res.status(500).send({error: `Error en eliminar producto: ${error}`})
    }
}



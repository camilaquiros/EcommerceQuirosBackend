import { productModel } from "../models/products.models.js";

export const getProducts = async(req, res) => {
    const {limit, page, sort, category, status} = req.query;
    const numberLimit = limit || 10
    const numberPage = page || 1
    const sorted = sort ==='asc' || sort === 'desc' ? sort : null

    const query = {}
    if (category) query.category = category
    if (status) query.status = status
    try {
        const products = await productModel.paginate(query, { limit: numberLimit, page: numberPage, sort: { price: sorted } })
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
        const product = await productModel.create({title, description, code, price, stock, category});
        if (product) {
            res.status(201).send(product)
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({error: `Llave duplicada`})
        } else {
            res.status(500).send({error: `Error en consultar producto: ${error}`})
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
            return res.status(400).send({error: `Llave duplicada`})
        } else {
            res.status(500).send({error: `Error en consultar producto: ${error}`})
        }
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params
    try {
        const product = await productModel.findByIdAndDelete(id,);
        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send({error: `Llave duplicada`})
        } else {
            res.status(500).send({error: `Error en eliminar producto: ${error}`})
        }
    }
}
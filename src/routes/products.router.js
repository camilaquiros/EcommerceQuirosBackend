import { Router } from "express";
import ProductManager from "../ProductManager.js";
import {promises} from 'fs';

const router = Router();

// Crear nueva instancia de la clase
const productManager = new ProductManager('./database/products.json')


//Mostrar un limite de productos desde el inicio(Ej: http://localhost:8080/products?limit=5) o Mostrar todos los productos si no se asigna un limite(Ej: http://localhost:8080/products)
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const {limit} = req.query;
    if(limit != undefined){
        const productLimited = products.slice(0,limit);
        res.send(productLimited)
    } else {
        res.send(products)
    }
});


//Muestra un solo producto según id(Ej: http://localhost:8080/products/2), si no existe tira un status 404 y un mensaje de error(Ej: http://localhost:8080/products/50)
router.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    const products = await productManager.getProducts();
    const product = products.find((product) => product.id == pid);
    if(product) return res.send(product); 
    else res.status(404).send('Producto no encontrado');
})


//Agrega un producto
router.post('/', async (req, res) => {
    const products = await productManager.getProducts();
    const { title, description, code, price, status, stock, category, thumbnails} = req.body;
    const id = products.length + 1;
    const product = { id, title, description, code, price, status, stock, category, thumbnails}
    products.push(product);
    promises.writeFile('./database/products.json',JSON.stringify(products, null, '\t'))
    // res.send({status:"success", message:"Producto agregado"})
    res.status(201).json(product);
})


//Actualiza un producto según su ID(el producto actualizado ingresa al final del archivo JSON ya que primero elimino el producto y luego lo vuelvo a agregar)
router.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    const products = await productManager.getProducts();
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    //estaba pasando el id como string entonces lo setee a number
    const id = Number(pid);
    const productModified = { id, title, description, code, price, status, stock, category, thumbnails}
    const product = products.find((product) => product.id == pid);
    if(product){
        const productsNew = products.filter((search) => search.id != pid);
        productModified.title = title;
        productModified.description = description;
        productModified.code = code;
        productModified.price = price;
        productModified.status = status;
        productModified.stock = stock;
        productModified.category = category;
        productModified.thumbnails = thumbnails;
        productsNew.push(productModified);
        promises.writeFile('./database/products.json',JSON.stringify(productsNew, null, '\t'));
        return res.json(productModified)
    }
    res.status(404).json({ error: "Producto no encontrado" })
})


//Elimina un producto según su ID
router.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    const products = await productManager.getProducts();
    if(products.find((product) => product.id == pid)) {
        const productsNew = products.filter((search) => search.id != pid);
        promises.writeFile('./database/products.json',JSON.stringify(productsNew, null, '\t'));
        return res.sendStatus(204);
    }
    res.status(404).json({ error: "Producto no encontrado" })
})


export default router;
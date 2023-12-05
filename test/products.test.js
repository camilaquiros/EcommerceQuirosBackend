import 'dotenv/config'
import chai from "chai";
import supertest from 'supertest';
import mongoose from "mongoose";
import { logger } from '../src/utils/logger.js'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        logger.info(`[${new Date().toLocaleString()}]: DB conectada`);
    })
    .catch((error) => logger.error("Error en conexion con MongoDB: ", error))

let idProduct

describe('Testing Aplicacion de Ecommerce', () => {
    describe('Test de productos', () => {
        it('Test endpoint /api/products, se espera que muestre todos los productos', async function() {
            const { _body } = await requester.get('/api/products')
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /api/products, se espera que genere un producto', async function() {
            const newProduct = {
                title: 'corrector',
                description: 'dsad',
                code: 'kmdsaKFLSAKD254',
                price: '26',
                status: 'true',
                stock: '54',
                category: 'rostro',
                thumbnails: []
            }

            const { ok, _body } = await requester.post('/api/products').send(newProduct) //requester.método('contenido o no')
            logger.info(ok)
            logger.info(JSON.stringify(_body))
            idProduct = _body._id
        })
        it('Test endpoint /api/products/:pid, se espera que actualice un producto', async function() {
            logger.info(idProduct)
            const updateProduct = {
                title: 'base algo',
                price: '418',
                stock: '10',
            }
            const { ok, _body } = await requester.put(`/api/products/${idProduct}`).send(updateProduct)
            logger.info(ok)
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /api/products/:pid, se espera que muestre un producto', async function() {
            const { _body } = await requester.get(`/api/products/${idProduct}`)
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /api/products/:pid, se espera que elimine un producto', async function() {
            const { _body } = await requester.delete(`/api/products/${idProduct}`)
            logger.info(JSON.stringify(_body))
        })
    })

    describe('Test de producto con imagen', () => {
        it('Test endpoint /api/products/withimage, se espera que genere un producto con una imagen', async function() {
            const newProduct = {
                title: 'corrector',
                description: 'dsad',
                code: 'kmdsaKFLSAKD254',
                price: '26',
                status: 'true',
                stock: '54',
                category: 'rostro',
            }
            const resultado = await requester.post('/api/products/withimage')
                .field('title', newProduct.title)
                .field('description', newProduct.description)
                .field('code', newProduct.code)
                .field('price', newProduct.price)
                .field('status', newProduct.status)
                .field('stock', newProduct.stock)
                .field('category', newProduct.category)
                .attach('thumbnails','./test/maybellinebase.jpg')//Carga de imágenes
            expect(resultado.status).to.be.ok
            expect(resultado._body.thumbnails).to.be.ok
            expect(resultado._body).to.have.property('_id')
        })
    })
})
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

let idCart 
let idProduct

describe('Testing Aplicacion de Ecommerce', () => {
    describe('Test de carrito', () => {
        it('Test endpoint /api/carts, se espera que muestre todos los productos del carrito', async function() {
            const { _body } = await requester.get(`/api/carts/65320427a606189eb4002bc1`)
            logger.info(JSON.stringify(_body))
            idCart = _body.message._id
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
        it('Test endpoint /api/carts/:cid/products/:pid, se espera que agregue un producto o actualice la cantidad del mismo en el carrito', async function() {
            const updateCart = {
                quantity: 1
            }
            const { ok, _body } = await requester.put(`/api/carts/${idCart}/products/${idProduct}`).send(updateCart)
            logger.info(ok)
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /api/carts/:cid/products/:pid, se espera que elimine un producto del carrito', async function() {
            const { _body } = await requester.delete(`/api/carts/${idCart}/products/${idProduct}`)
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /api/carts/:cid, se espera que elimine todos los productos del carrito', async function() {
            const { _body } = await requester.delete(`/api/carts/${idCart}`)
            logger.info(JSON.stringify(_body))
        })
    })
})
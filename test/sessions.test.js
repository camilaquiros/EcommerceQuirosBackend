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

describe('Testing Aplicacion de Ecommerce', () => {
    describe('Test de usuarios', () => {
        it('Test endpoint /api/users/register, se espera que registre un nuevo usuario', async function() {
            const newUser = {
                first_name: 'Pancho',
                last_name: 'Perez',
                email: 'pancho@perez',
                password: 'JKDSAK5468dsf',
                age: 26
            }
            const { ok, _body } = await requester.post('/api/users/register').send(newUser) //requester.método('contenido o no')
            logger.info(ok)
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /, se espera que loguee al nuevo usuario', async function() {
            const loggedUser = {
                email: 'pancho@perez',
                password: 'JKDSAK5468dsf',
            }

            const { ok, _body } = await requester.post('/').send(loggedUser) //requester.método('contenido o no')
            logger.info(ok)
            logger.info(JSON.stringify(_body))
        })
        it('Test endpoint /current, se espera que muestre los datos del usuario logueado actualmente', async function() {
            const { _body } = await requester.get('/current')
            logger.info(JSON.stringify(_body))
        })
    })
})
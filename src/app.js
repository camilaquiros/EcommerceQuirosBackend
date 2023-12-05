import 'dotenv/config'
import express from 'express'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express';
import router from './routes/index.routes.js'
import { initializePassport } from './config/passport.js'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import { logger } from './utils/logger.js'


const app = express();
const PORT = 8080

//SWAGGER
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentacion del proyecto final del curso de Backend',
            description: 'API Coderhouse Backend'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`] // **:cualquier subcarpeta, *:cualquier nombre de archivo
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
app.use(cookieParser(process.env.JWT_SECRET)) //firmar cookie
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {usenewUrlParser: true, useUnifiedTopology: true},
        ttl: 120
    }),
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//rutas
app.use('/', router)
router.use(express.static(path.join(__dirname, '/public')))

//server
app.listen(PORT, (req, res) => {
    logger.info(`[${new Date().toLocaleString()}]: Escuchando puerto ${PORT}`);
});

//BDD
await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        logger.info(`[${new Date().toLocaleString()}]: DB conectada`);
    })
    .catch((error) => logger.error("Error en conexion con MongoDB: ", error))




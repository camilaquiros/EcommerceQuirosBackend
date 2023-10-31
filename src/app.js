import 'dotenv/config'
import express from 'express'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import path from 'path'
import router from './routes/index.routes.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import { initializePassport } from './config/passport.js'


const app = express();
const PORT = 8080

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
app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`)
});

//BDD
mongoose.connect(process.env.MONGO_URL)
    .then(async(req, res) => { 
        console.log("DB conectada")
    })
    .catch((error) => console.log("Error en conexion con MongoDB: ", error))




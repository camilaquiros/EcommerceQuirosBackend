import 'dotenv/config'
import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import mongoose from 'mongoose';
import { cartModel } from './models/carts.models.js';

const app = express();
const PORT = 8080



mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterquiros.jkdzmep.mongodb.net/Ecommerce-Quiros?retryWrites=true&w=majority`)
    .then(async() => { 
        console.log("DB conectada")
        // await cartModel.create({})
        const cart = await cartModel.findOne({_id: "65044859b9ff5276a5a5e46d"}).populate('products.id_prod')
        console.log(JSON.stringify(cart))
    })
    .catch((error) => console.log("Error en conexion con MongoDB: ", error))



app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`)
});
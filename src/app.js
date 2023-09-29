import 'dotenv/config'
import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 8080

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterquiros.jkdzmep.mongodb.net/Ecommerce-Quiros?retryWrites=true&w=majority`)
    .then(async(req, res) => { 
        console.log("DB conectada")
        // await cartModel.create({})
    })
    .catch((error) => console.log("Error en conexion con MongoDB: ", error))



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`)
});





















/* ⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣳⠦⢖⣒⢲⣲⡦⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡴⢻⣦⡲⠤⡀⠹⡋⢷⡇⣿⡷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢼⢠⣿⡟⠃⢀⣠⡄⠱⠀⣿⣿⠛⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠠⣿⣿⣛⡀⠚⠟⠛⠁⠀⠀⠙⠈⣧⣰⣽⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣾⣿⡟⠏⠀⠀⠀⠀⠀⠀⡀⠀⣸⡟⢃⠼⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⣿⣿⡿⢆⣀⢠⡶⠀⠀⠀⣠⠆⠐⠁⠀⠃⢀⣼⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠛⠳⡾⡾⠛⠀⠀⠀⡎⠁⠀⠀⠀⡀⠀⠈⠁⠀⠳⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⠀⠀⠀⢣⡀⠀⣠⠖⠁⠀⠀⠀⠀⢠⡟⢦⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀⠀⠀⠀⠀⠈⠣⠊⠁⠀⠀⠀⠀⠀⢠⠟⠇⢀⣿⣄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡾⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⠀⠃⠀⠀⠀⢼⡏⠘⢇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣇⡀⠀⠀⠀⠀⠀⢀⠤⠒⠁⠀⢀⡄⠀⠀⠀⢰⠊⠀⠀⣾⡄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠸⡿⢤⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⡾⠂⠀⠀⠘⠉⠀⠀⣴⢻⢷⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢿⠬⠑⠤⠀⠀⠀⠀⠀⠀⣠⠞⠁⠀⠀⠀⢀⠀⠀⠐⠃⢘⣿⣷⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⡇⠀⠀⠀⠀⠀⠀⠀⡘⠁⡀⠀⠀⠀⢠⡟⠀⠀⠀⠟⣈⣻⣿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⣻⡇⠀⠀⣸⡁⠀⠀⠀⢷⣸⠀⠀⠀⠀⣯⠀⣄⣫⣤⣺⣿⣿⡿⠀
⠀⠀⠀⠀⠀⣀⠤⠚⣹⡂⠀⢰⣿⣿⣦⠤⠤⠾⡟⠀⠀⠀⣼⣿⣧⣿⣿⣿⣿⣿⠟⠁⠀
⢀⣠⠒⠋⠉⢁⣠⠴⣻⠁⢠⣼⠛⠁⠀⠀⠀⠀⣷⠀⠀⢠⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀
⠈⠛⠛⠒⠉⠉⣀⢤⠃⢀⣿⠷⠴⠤⣄⣀⡀⠀⡿⠀⢀⣾⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀
⠀⠀⣠⠤⠒⠉⡠⠃⠀⢨⠏⠀⠀⠀⠀⠀⠉⠉⡇⠀⢸⡟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠛⠧⣶⠟⢠⠀⣠⠋⠀⠀⠀⠀⠀⠀⠀⢠⠇⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠿⢴⡷⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⢸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡄⢀⡀⢸⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⣇⣸⡥⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ */



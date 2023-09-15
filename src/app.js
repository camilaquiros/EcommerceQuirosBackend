import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js'
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'))

app.use('/api/products', productsRouter)

app.listen(8080, () => {
    console.log('Escuchando puerto 8080')
});


//Conectar base de datos
const connectMongoDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.33p5jan.mongodb.net/?retryWrites=true&w=majority')
        console.log("Conectado con exito a MongoDB usando Mongoose")
    } catch (error) {
        console.error(error);
        process.exit();
    }
}

connectMongoDB();




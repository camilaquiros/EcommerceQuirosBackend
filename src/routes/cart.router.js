import { Router } from "express";
import CartManager from "../CartManager.js";
import { promises } from 'fs';

const router = Router();

// Crear nueva instancia de la clase
const cartManager = new CartManager('./database/cart.json')


//Agrega un producto al carrito 
router.post('/', async (req, res) => {
    const cart = await cartManager.getCart();
    const {product} = req.body;
    let quantity = 1;
    const id = cart.length + 1;
    const productArray = { id, products: [{product, quantity}] }
    cart.push(productArray);
    promises.writeFile('./database/cart.json',JSON.stringify(cart, null, '\t'))
    res.status(201).json(cart);
})


//Mostrar carrito según id
router.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    const cart = await cartManager.getCart();
    const cartId = cart.find((product) => product.id == cid);
    if(cartId) return res.send(cartId.products); 
    else res.status(404).send('Carrito no encontrado');
});


//Agregar un producto al carrito o aumentar la cantidad del mismo si ya esta en el carrito. Req.body debe ser igual a pid o sino se rompe el json
router.post("/:cid/product/:pid", async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const cart = await cartManager.getCart();
    const { quantity } = req.body;
    const newProduct = { product: parseInt(pid), quantity };
    console.log(newProduct);
    const cartId = cart.find((c) => c.id == cid);
    if (cartId) {
      const productId = cartId.products.find((p) => p.product == pid);
      if (productId) {
        const newArray = cartId.products.filter(
          (search) => search.product != pid
        );
        newProduct.quantity = newProduct.quantity + productId.quantity;
        newArray.push(newProduct);
        cartId.products = newArray;
        promises.writeFile(
          "./database/cart.json",
          JSON.stringify(cart, null, "\t")
        );
        res.status(201).json(cartId.products);
      } else {
        cartId.products.push(newProduct);
        promises.writeFile(
          "./database/cart.json",
          JSON.stringify(cart, null, "\t")
        );
        res.status(201).json(cartId.products);
      }
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  });



export default router;
import { Router } from "express";
import { getCart, putCart, putArrayCart, deleteProductCart, deleteCart } from "../controllers/carts.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";

const cartRouter = Router();

//GET
cartRouter.get('/:cid', passportError('jwt'), authorization('user'), getCart)

//PUT NUEVO PRODUCTO O NUEVA CANTIDAD
cartRouter.put('/:cid/products/:pid',  passportError('jwt'), authorization('user'), putCart)

//PUT ARRAY DE PRODUCTOS
cartRouter.put('/:cid', passportError('jwt'), authorization('user'), putArrayCart)

//DELETE PRODUCTO DEL CARRITO
cartRouter.delete('/:cid/products/:pid', passportError('jwt'), authorization('user'), deleteProductCart)

//DELETE CARRITO ENTERO
cartRouter.delete('/:cid', passportError('jwt'), authorization('user'), deleteCart)

export default cartRouter;
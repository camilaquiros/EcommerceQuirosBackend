import { Router } from "express";
import { getProducts, getProduct, postProduct, putProduct, deleteProduct } from "../controllers/products.controller.js";
import { passportError, authorization } from "../utils/messageErrors.js";


const productRouter = Router();

//GET
productRouter.get('/', getProducts)
productRouter.get('/:id', getProduct)

//POST
productRouter.post('/', passportError('jwt'), authorization('admin'), postProduct)

//PUT
productRouter.put('/:id', passportError('jwt'), authorization('admin'), putProduct)

//DELETE
productRouter.delete('/:id', passportError('jwt'), authorization('admin'), deleteProduct)

export default productRouter;
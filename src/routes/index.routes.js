import { Router } from "express";
import productsRouter from './products.routes.js'
import cartRouter from './cart.routes.js'
import userRouter from './users.routes.js'
import sessionRouter from './sessions.routes.js'
import fakerRouter from "./faker.routes.js";
import mailRouter from "./mail.routes.js";
import loggerRouter from "./logger.routes.js";

const router = Router()

//rutas
router.use('/', sessionRouter)
router.use('/api/users', userRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)
router.use('/api/mockingproducts', fakerRouter)
router.use('/api/mail', mailRouter)
router.use('/api/loggerTest', loggerRouter)

export default router
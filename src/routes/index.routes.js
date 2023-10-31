import { Router } from "express";
import productsRouter from './products.routes.js'
import cartRouter from './cart.routes.js'
import userRouter from './users.routes.js'
import sessionRouter from './sessions.routes.js'

const router = Router()

//rutas
router.use('/', sessionRouter)
router.use('/api/users', userRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)

export default router
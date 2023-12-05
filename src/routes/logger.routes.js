import { Router } from "express";
import { addLogger } from '../utils/logger.js'

const loggerRouter = Router()

//WINSTON
loggerRouter.use(addLogger)
loggerRouter.get('/', (req,res) => {
    res.send({message:"Prueba de logger"})
})

export default loggerRouter
import { Router } from "express";
import { getRegister, postRegister, getDetails } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.get('/register', getRegister)

userRouter.post('/register', postRegister)

userRouter.get('/details', getDetails)


export default userRouter
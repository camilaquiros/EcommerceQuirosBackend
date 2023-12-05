import { Router } from "express";
import { getRegister, postRegister, getDetails } from "../controllers/users.controller.js";
import passport from "passport";

const userRouter = Router()

userRouter.get('/register', getRegister)

userRouter.post('/register', passport.authenticate('register'), postRegister)

userRouter.get('/details', getDetails)


export default userRouter
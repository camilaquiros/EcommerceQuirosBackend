import { Router } from "express";
import { createRandomProduct } from "../controllers/faker.controller.js";

const fakerRouter = Router();

fakerRouter.get('/', createRandomProduct)

export default fakerRouter
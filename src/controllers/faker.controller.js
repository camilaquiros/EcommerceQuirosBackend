import { modelProduct } from "../helpers/faker.js" 

export const createRandomProduct = async(req, res) => {
    const products = []
    for(let i = 0; i < 100; i++) {
        products.push(modelProduct())
    }
    res.send({status:"success", payload:products})
}


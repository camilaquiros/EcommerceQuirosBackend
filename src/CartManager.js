import { promises } from 'fs';

export default class CartManager {
    cart = [];
    product = [Product];
    constructor(path){
        this.path = path;
    }

    async getCart(){
        try {
            const database = await promises.readFile(this.path, "utf-8");
            const databaseParsed = JSON.parse(database);
            return databaseParsed;
        } catch(error) {
            console.log(error);
            return [];
        }
    }
}

class Product extends CartManager {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}


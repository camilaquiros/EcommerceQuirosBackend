import { promises } from 'fs';

export default class ProductManager {
    products = [];
    product = Product;
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try {
            const database = await promises.readFile(this.path, "utf-8");
            const databaseParsed = JSON.parse(database)
            return databaseParsed;
        } catch(error) {
            console.log(error);
            return [];
        }
    }
}

class Product extends ProductManager {
    contructor(id, title, description, code, price, status, stock, category, thumbnails) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}
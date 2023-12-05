export const generateProductErrorInfo = (product) => {
    return `Una o mas propiedades estaban incompletas o no eran validas.
    Lista de propiedades requeridas:
    * title: necesita ser un string, se recibio ${product.title}
    * description: necesita ser un string, se recibio ${product.description}
    * code: necesita ser un string, se recibio ${product.code}
    * price: necesita ser un numero, se recibio ${product.price}
    * stock: necesita ser un numero, se recibio ${product.stock}
    * category: necesita ser un string, se recibio ${product.category}
    `
}
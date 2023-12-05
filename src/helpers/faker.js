import { faker } from "@faker-js/faker";

export const modelProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
        price: faker.commerce.price(),
        stock: faker.number.int(500),
        category: faker.commerce.department(),
        status: faker.datatype.boolean()
    }
}



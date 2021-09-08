const getProductsById = require('../lambdas/getProductsById');


const productIdObj = {
    pathParameters: {
        productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    },
  };
  const productIdObjWrong = {
    pathParameters: {
        productId: "7567ec4b",
    },
};

test("Get right status code and right product:", async () => {

    const rightRes = {
        count: 1,
        description: "desc 1",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        price: 2.4,
        title: "guitar 1"
    };
    const response = await getProductsById.handler(productIdObj)
    expect(response.body).toBe(JSON.stringify(rightRes));
    expect(response.statusCode).toBe(200);
});

it('Return correct structure of data', async() => {
    const response = await getProductsById.handler(productIdObj)
    const product = JSON.parse(response.body)
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("count");
    expect(product).toHaveProperty("title");
    expect(product).toHaveProperty("price");
    expect(product).toHaveProperty("description");
});

test("Wrong id params, should be 404 ", async () => {

    const rightRes = { message: 'Error: Product not found!' };
    const response = await getProductsById.handler(productIdObjWrong)
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe(JSON.stringify(rightRes));
})
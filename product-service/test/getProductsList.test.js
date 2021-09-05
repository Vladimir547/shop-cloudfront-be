const getProductsList = require('../lambdas/getProductsList');
test('Return correct status code', async() => {
    const response = await getProductsList.handler();
    expect(response.statusCode).toEqual(200);
});

test('Return products', async() => {
  const response = await getProductsList.handler();
  expect(response.body).toBeDefined();
});
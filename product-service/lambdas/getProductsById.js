import products from './db/products.json';

export const handler = async (event) => {
    const { productId } = event.pathParameters || {};
    const getProduct = products.filter((item, id) => {
        return item.id == productId;
    });
    if (!getProduct)   { 
        return { message: 'Error: Product not found!' }, 400;
}
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
          },
        statusCode: 200,
        body: JSON.stringify(...getProduct)
    }
}
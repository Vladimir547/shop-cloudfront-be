import products from './db/products.json';

export const handler = async (event) => {
    const { productId } = event.pathParameters || {};
    const getProduct = products.find((item, id) => {
        return item.id == productId;
    });
    const response = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
          },
        statusCode: 200,
    }
    if (!getProduct)   { 
        response.body =  JSON.stringify({ message: 'Error: Product not found!' });

        response.statusCode = 404;
    } else {
        response.body = JSON.stringify(getProduct); 
    }
    return response;
}
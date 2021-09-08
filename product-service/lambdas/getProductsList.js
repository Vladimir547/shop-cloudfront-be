import products from './db/products.json';

export const handler = async (event) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
          },
        statusCode: 200,
        body: JSON.stringify(products)
    }
};
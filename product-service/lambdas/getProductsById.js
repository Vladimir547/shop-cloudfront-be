import products from './db/products.json';
import { Client } from 'pg';
import { ConnectDB, dbOptions } from '../conection'

export const handler = async (event) => {
    console.log(event);
    const { productId } = event.pathParameters || {};
    const getProduct = products.find((item, id) => {
        return item.id == productId;
    });
    const db = new ConnectDB();

    try {
        const client = await db.connect();

        const { rows } = await client.query(`select products.*, stock.count from products left join stock on products.id = stock.product_id where products.id='${productId}'`);
        return {
            headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                  },
                statusCode: 200,
                body: JSON.stringify(rows)
            };
    } catch (error) {

    return {
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
              },
            statusCode: 404,
            body: JSON.stringify({ message: error.message })
        };
    } finally {
        db.disconnect();
    }
    // const response = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Methods': '*',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //     statusCode: 200,
    // }
    // if (!getProduct)   { 
    //     response.body =  JSON.stringify({ message: 'Error: Product not found!' });

    //     response.statusCode = 404;
    // } else {
    //     response.body = JSON.stringify(getProduct); 
    // }
    // return response;
}
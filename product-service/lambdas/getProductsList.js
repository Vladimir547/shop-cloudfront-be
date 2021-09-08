import products from './db/products.json';
import { Client } from 'pg';
import { ConnectDB, dbOptions } from '../conection'




export const handler = async (event) => {
    console.log(event);
    const db = new ConnectDB();

    try {
        const client = await db.connect();

        const { rows } = await client.query(`select products.*, stock.count from products left join stock on products.id = stock.product_id`);

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
            statusCode: 500,
            body: JSON.stringify(error.message)
        };
    } finally {
        db.disconnect();
    }
};
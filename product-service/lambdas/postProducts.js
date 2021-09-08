import products from './db/products.json';
import { Client } from 'pg';
import { ConnectDB, dbOptions } from '../conection'

export const handler = async event => {
  console.log(event);
  const db = new ConnectDB(dbOptions);
  const client = await db.connect();

  try {
    const { title, description, price, count } = JSON.parse(event.body);
    const notAllParams = !title || !description || !price  || !count;
    const wrongTypes = typeof title === "string" && typeof description === "string" && typeof price === "number" && typeof count === "number";
    if (notAllParams) {
      return {
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
              },
            statusCode: 400,
            body: JSON.stringify({ message: 'lack params' })
        };
    }
    if (!wrongTypes) {
        return {
            headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                },
            statusCode: 400,
            body: JSON.stringify({ message: 'wrong types' })
        };
    }

    await client.query('BEGIN');

    const insertSql =
      'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id';
    const postQuerry = await client.query(insertSql, [title, description, price]);
    const { id: productId } = postQuerry.rows[0];

    const StocksSql = 'INSERT INTO stock(product_id, count) VALUES ($1, $2)';
    await client.query(StocksSql, [productId, count]);

    await client.query('COMMIT');

    const dataToResponse = {
      title,
      description,
      price,
      count,
      id: productId,
    };

return  {       
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify(dataToResponse)
        };
  } catch (error) {
    await client.query('ROLLBACK');
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
    await db.disconnect();
  }
};
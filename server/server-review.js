const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 4000;

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'business',
  password: 'password',
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.get('/api/:id/header', async (req, res) => {
  const client = await pool.connect();
  try {
    const restaurant = await client.query(`SELECT * FROM review_schema.review WHERE restaurant_id = ${req.params.id}`);

    const categoryIds = await client.query(`SELECT category_id FROM restaurant_category WHERE restaurant_id = ${req.params.id}`);
    const arr1 = categoryIds.rows.map(el => el.category_id);
    const category = await client.query(`SELECT * FROM category WHERE category_id in (${arr1[0]}, ${arr1[1]}, ${arr1[2]})`);

    const review = await axios.get(`http://localhost:4000/api/${req.params.id}/review`);

    const result = {
      restaurant: restaurant.rows,
      category: category.rows,
      review: review.data,
    };
    res.send(result);
  } catch (e) {
    res.status(404).send('restaurant not found');
    console.log(e.stack);
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

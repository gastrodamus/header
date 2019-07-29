const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 3003;

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
    const restaurant = await client.query(`SELECT * FROM business_schema.restaurant WHERE restaurant_id = ${req.params.id}`);

    const categoryIds = await client.query(`SELECT category_id FROM business_schema.restaurant_category WHERE restaurant_id = ${req.params.id}`);
    const arr1 = categoryIds.rows.map(el => el.category_id);
    const category = await client.query(`SELECT * FROM business_schema.category WHERE category_id in (${arr1[0]}, ${arr1[1]}, ${arr1[2]})`);

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

app.get('/api/:id/header/review', async (req, res) => {
  const client = await pool.connect();
  try {
    // const reviewIds = await client.query(`SELECT review_id FROM business_schema.review WHERE restaurant_id = ${req.params.id}`);
    // const arr2 = reviewIds.rows.map(el => el.review_id);
    // const review = await client.query(`SELECT * FROM business_schema.review WHERE review_id in (${arr2[0]}, ${arr2[1]}, ${arr2[2]})`);
    // res.send(review.rows);
    res.send('test');
  } catch (e) {
    res.status(404).send('restaurant not found');
    console.log(e.stack);
  } finally {
    client.release();
  }
});

app.post('/api/:id/header', async (req, res) => {
  const client = await pool.connect();
  try {
    if (req.query.category) {
      const category = await client.query(`SELECT category_id FROM business_schema.category WHERE LOWER(category) = LOWER('${req.query.category}')`);
      const result = await client.query(`INSERT INTO business_schema.restaurant_category (restaurant_id, category_id) VALUES (${req.params.id}, ${category.rows[0].category_id})`);
      console.log(result);
      res.send('successfully added category');
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(404).send('restaurant not found');
    console.log(e.stack);
  } finally {
    client.release();
  }
});

app.patch('/api/header/:id/category', async (req, res) => {

});

app.delete('/api/header/:id/category', async (req, res) => {

});

app.listen(port, () => console.log(`Server listening on port ${port}`));

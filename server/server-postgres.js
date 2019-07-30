const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 3003;

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'header',
  password: 'password',
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

app.use(express.json());

app.get('/api/:id/header', async (req, res) => {
  const client = await pool.connect();
  try {
    const restaurant = await client.query(`SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`);

    const categoryIds = await client.query(`SELECT category_id FROM restaurant_category WHERE restaurant_id = ${req.params.id}`);
    const arr1 = categoryIds.rows.map(el => el.category_id);
    const category = await client.query(`SELECT * FROM category WHERE category_id in (${arr1[0]}, ${arr1[1]}, ${arr1[2]})`);

    // const review = await axios.get(`http://localhost:4000/api/${req.params.id}/review`);

    const result = {
      restaurant: restaurant.rows,
      category: category.rows,
      // review: review.data,
    };
    res.send(result);
  } catch (e) {
    res.status(404).send('restaurant not found');
    console.log(e.stack);
  } finally {
    client.release();
  }
});

app.post('/api/header', async (req, res) => {
  const client = await pool.connect();
  try {
    if (req.body) {
      // req.body example: {"catId": 2, "resId": 1}
      // update with new category id
      const result = await client.query(
        `INSERT INTO restaurant_category (restaurant_id, category_id) 
        VALUES (${req.body.resId}, ${req.body.catId})`,
      );
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

app.patch('/api/header', async (req, res) => {
  const client = await pool.connect();
  try {
    if (req.body) {
      // req.body example: {"oldCatId": 2, "resId": 1, "newCat": "Singaporean"}
      // retrieve new category id
      // update with new category id
      const newCat = await client.query(`SELECT category_id FROM category WHERE category_name = '${req.body.newCat}'`);
      const result = await client.query(
        `UPDATE restaurant_category 
        SET category_id = ${newCat.rows[0].category_id}
        WHERE restaurant_id = ${req.body.resId}
        AND category_id = ${req.body.oldCatId}`,
      );
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

app.delete('/api/header', async (req, res) => {
  const client = await pool.connect();
  try {
    if (req.body) {
      // req.body example: {"catId": 2, "resId": 1}
      // delete category
      const result = await client.query(
        `DELETE FROM restaurant_category 
        WHERE category_id = '${req.body.catId}'`,
      );
      console.log(result);
      res.send('successfully deleted category');
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

app.listen(port, () => console.log(`Server listening on port ${port}`));

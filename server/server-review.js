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

app.get('/api/:id/review', async (req, res) => {
  const client = await pool.connect();
  try {
    const review = await client.query(`SELECT * FROM review WHERE restaurant_id = ${req.params.id}`);

    const result = {
      review: review.rows,
    };
    res.send(result);
  } catch (e) {
    res.status(404).send('review not found', e.stack);
  } finally {
    client.release();
  }
});

app.post('/api/:id/review', async (req, res) => {
  const client = await pool.connect();
  try {
    if (req.body.review) {
      await client.query(
        `INSERT INTO review (review, restaurant_id, price, star, date)
        VALUES (${req.body.review}, ${req.params.id}, ${req.body.star}, ${req.body.date})`,
      );
    }
  } catch (e) {
    res.status(404).send('restaurant not found', e.stack);
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

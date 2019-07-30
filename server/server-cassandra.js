const express = require('express');
const cassandra = require('cassandra-driver');
const axios = require('axios');

const app = express();
const port = 3003;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'business',
});

app.get('/api/header', async (req, res) => {
  const query = 'SELECT * FROM restaurant limit 100';
  try {
    const result = await client.execute(query, []);
    res.send(result.rows);
  } catch (err) {
    res.status(404).send('restaurant not found');
    console.log(err);
  }
});

app.get('/api/:id/header', async (req, res) => {
  const query = `SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`;
  try {
    const restaurant = await client.execute(query, []);

    const review = await axios.get(`http://localhost:4000/api/${req.params.id}/review`);

    const result = {
      restaurant: restaurant.rows,
      review: review.data,
    };
    res.send(result);
  } catch (err) {
    res.status(404).send('restaurant not found');
    console.log(err);
  }
});

app.get('/api/:id/header/review', async (req, res) => {
  try {
    res.send('test');
  } catch (e) {
    res.status(404).send('restaurant not found');
    console.log(e.stack);
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

const express = require('express');
const { Pool } = require('pg');

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

app.get('/api/header/:listingid', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT * FROM business_schema.restaurant WHERE restaurant_id = ${req.params.listingid}`);
    res.send(result.rows);
  } catch (e) {
    res.status(404).send('restaurant not found');
    console.log(e.stack);
  } finally {
    client.release();
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

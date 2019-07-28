const express = require('express');
const cassandra = require('cassandra-driver');

const app = express();
const port = 3003;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'business',
});

app.get('/api/header/:listingid', async (req, res) => {
  const query = `SELECT * FROM restaurant WHERE restaurant_id = ${req.params.listingid}`;
  try {
    const result = await client.execute(query, []);
    res.send(result.rows);
  } catch (err) {
    res.status(404).send('restaurant not found');
    console.log(err);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

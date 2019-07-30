const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'header',
  password: 'password',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getReview = async (req, res) => {
  const review = await pool.query(`SELECT * FROM review WHERE restaurant_id = ${req.params.id}`);
  res.send(review.rows);
};

const postReview = async (req, res) => {
  await pool.query(
    `INSERT INTO review (review, restaurant_id, price, star, date)
    VALUES (${req.body.review}, ${req.params.id}, ${req.body.star}, ${req.body.date})`,
  );
  res.send('successfully posted review');
};

module.exports = {
  getReview,
  postReview,
};

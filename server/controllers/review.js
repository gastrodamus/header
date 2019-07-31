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

const getDishReview = async (req, res) => {
  const reviewId = await pool.query(`SELECT review_id FROM review_dish WHERE dish_id = ${req.params.dishid}`);
  const review = await pool.query(`SELECT * FROM review WHERE restaurant_id = ${reviewId}`);
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
  getDishReview,
  postReview,
};

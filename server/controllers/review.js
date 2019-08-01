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

const queryDb = async (q) => {
  try {
    const result = await queryDb(q);
    return result.rows;
  } catch (err) {
    console.log(err.stack);
    return null;
  }
};

const getReview = async (req, res) => {
  const result = await queryDb(`SELECT * FROM review WHERE restaurant_id = ${req.params.id}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const getDishReview = async (req, res) => {
  const reviewId = await queryDb(`SELECT review_id FROM review_dish WHERE dish_id = ${req.params.dishid}`);
  const result = await queryDb(`SELECT * FROM review WHERE restaurant_id = ${reviewId}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const postReview = async (req, res) => {
  const result = await queryDb(
    `INSERT INTO review (review, restaurant_id, price, star, date)
    VALUES (${req.body.review}, ${req.params.id}, ${req.body.star}, ${req.body.date})`,
  );
  return (result ? res.send('successfully posted review') : res.sendStatus(404));
};

module.exports = {
  getReview,
  getDishReview,
  postReview,
};

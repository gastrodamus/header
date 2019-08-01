const { Pool } = require('pg');
const { mean } = require('mathjs');

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
    const result = await pool.query(q);
    return result.rows;
  } catch (err) {
    console.log(err.stack);
    return null;
  }
};

const getReviews = async (req, res) => {
  const result = await queryDb(`SELECT * FROM review WHERE restaurant_id = ${req.params.id}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const getAvgStars = async (req, res) => {
  const avgStars = {};
  const reviews = await queryDb(`SELECT star, date FROM review WHERE restaurant_id = ${req.params.id}`);
  reviews.forEach((review) => {
    // console.log(review.date);
    const reviewMth = review.date.split('-')[0];
    const reviewYr = review.date.split('-')[2];
    const reviewDate = reviewMth.concat('-', reviewYr);
    if (!avgStars[reviewDate]) {
      avgStars[reviewDate] = [review.star];
    } else {
      avgStars[reviewDate].push(review.star);
    }
  });
  const result = {};
  for (let i = 0; i < Object.keys(avgStars).length; i++) {
    result[Object.keys(avgStars)[i]] = Math.round(mean(avgStars[Object.keys(avgStars)[i]]) * 10) / 10;
  }
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
  getReviews,
  getAvgStars,
  getDishReview,
  postReview,
};

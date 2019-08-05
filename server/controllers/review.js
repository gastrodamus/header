const { Pool } = require('pg');
const { mean } = require('mathjs');
const { client } = require('../cacheService');

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

function simpleHash(str, max) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

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
  const reviews = [];
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = ['2015', '2016', '2017', '2018', '2019'];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 12; j++) {
      const hashedNum = simpleHash(req.params.id + (i * j) + j, 35);
      reviews.push({
        star: (hashedNum + 15) / 10,
        date: month[j].concat('-', month[j].concat('-', year[i])),
      });
    }
  }

  const avgStars = {};
  const stars = [];
  const data = await queryDb(`SELECT * FROM review WHERE restaurant_id = ${req.params.id}`);
  data.forEach((el) => {
    const reviewMth = el.date.split('-')[0];
    const reviewYr = el.date.split('-')[2];
    const reviewDate = reviewMth.concat('-10-', reviewYr);
    if (!avgStars[reviewDate]) {
      avgStars[reviewDate] = [el.star];
    } else {
      avgStars[reviewDate].push(el.star);
    }
  });

  for (let i = 0; i < Object.keys(avgStars).length; i++) {
    const avgStar = Math.round(mean(avgStars[Object.keys(avgStars)[i]]) * 10) / 10;
    stars.push({
      star: avgStar,
      date: Object.keys(avgStars)[i],
    });
  }

  const result = { reviews, stars };
  client.set(req.method + req.originalUrl, JSON.stringify(result));
  return (result ? res.send(result) : res.sendStatus(404));
};

const getDishReview = async (req, res) => {
  const reviewId = await queryDb(`SELECT review_id FROM review_dish WHERE dish_id = ${req.params.dishid}`);
  const result = await queryDb(`SELECT * FROM review WHERE restaurant_id = ${reviewId}`);
  client.set(req.method + req.originalUrl, JSON.stringify(result));
  return (result ? res.send(result) : res.sendStatus(404));
};

const postReview = async (req, res) => {
  const result = await queryDb(
    `INSERT INTO review (review, restaurant_id, price, star, date)
    VALUES (${req.body.review}, ${req.params.id}, ${req.body.star}, ${req.body.date})`,
  );
  client.set(req.method + req.originalUrl, JSON.stringify(result));
  return (result ? res.send('successfully posted review') : res.sendStatus(404));
};

module.exports = {
  getReviews,
  getDishReview,
  postReview,
};

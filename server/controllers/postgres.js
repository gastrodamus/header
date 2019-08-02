const { Pool } = require('pg');
const axios = require('axios');
const CacheService = require('../cache');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

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

const queryDb = (q) => {
  try {
    return cache.get(q, async () => {
      const result = await pool.query(q);
      return result.rows;
    })
      .then(result => result);
  } catch (err) {
    console.log(err.stack);
    return null;
  }
};

const getRestaurantList = async (req, res) => {
  const result = await queryDb('SELECT * FROM restaurant LIMIT 100');
  return (result ? res.send(result) : res.sendStatus(404));
};

const getRestaurantInfo = async (req, res) => {
  const info = await queryDb(`SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`);
  const categoryIds = await queryDb(`SELECT category_id FROM restaurant_category WHERE restaurant_id = ${req.params.id}`);
  const categories = await Promise.all(categoryIds.map(el => queryDb(`SELECT * FROM category WHERE category_id in (${el.category_id})`)));
  const response = await axios.get(`http://localhost:4000/api/review/avg/${req.params.id}`);
  const avgStars = response.data;
  const response1 = await axios.get(`http://localhost:4000/api/review/${req.params.id}`);
  const reviewCount = response1.data.length;
  const cat = categories.reduce((a, b) => a.concat(b));
  const result = info[0];
  result.reviewCount = reviewCount;
  result.categories = cat;
  result.avgStars = avgStars;
  return (result ? res.send(result) : res.sendStatus(404));
};

const getRestaurant = async (req, res) => {
  const result = await queryDb(`SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const getCategories = async (req, res) => {
  const categoryIds = await queryDb(`SELECT category_id FROM restaurant_category WHERE restaurant_id = ${req.params.id}`);
  const result = await Promise.all(categoryIds.map(el => queryDb(`SELECT * FROM category WHERE category_id in (${el.category_id})`)));
  return (result ? res.send(result) : res.sendStatus(404));
};

const getAvgStars = async (req, res) => {
  const result = await axios.get(`http://localhost:4000/api/review/avg/${req.params.id}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const postCategory = async (req, res) => {
  // update with new category id
  const check = await queryDb(
    `SELECT * FROM restaurant_category (restaurant_id, category_id)
    VALUES (${req.params.id}, ${req.params.catId})`,
  );
  let result;
  if (!check) {
    result = await queryDb(
      `INSERT INTO restaurant_category (restaurant_id, category_id)
      VALUES (${req.params.id}, ${req.params.catId})`,
    );
  } else {
    return res.send('category already exists');
  }
  return (result ? res.send('successfully added category') : res.sendStatus(404));
};

const postRestaurant = async (req, res) => {
  // req.body example: {"resName": "Seafood", "resPrice": 35}
  const check = await queryDb(
    `SELECT * FROM restaurant (restaurant_name)
    VALUES (${req.body.resName})`,
  );
  let result;
  if (!check) {
    result = await queryDb(
      `INSERT INTO restaurant (restaurant_name, price) 
      VALUES (${req.body.resName}, ${req.body.resPrice})`,
    );
  } else {
    return (res.send('restaurant already exists'));
  }
  return (result ? res.send('successfully added restaurant') : res.sendStatus(404));
};

const patchRestaurant = async (req, res) => {
  const result = await queryDb(
    `UPDATE restaurant
    SET restaurant_name = ${req.body.newRestaurant.resName}
    WHERE restaurant_id = ${req.params.id}`,
  );
  return (result ? res.send('successfully patched restaurant') : res.sendStatus(404));
};

// new category id

const patchCategory = async (req, res) => {
  // req.body example: {"oldCatId": 2, "newCatId": "5"}
  // update with new category id
  const result = await queryDb(
    `UPDATE restaurant_category 
    SET category_id = ${req.body.newCatId}
    WHERE restaurant_id = ${req.params.id}
    AND category_id = ${req.body.oldCatId}`,
  );
  return (result ? res.send('successfully patched category') : res.sendStatus(404));
};

const deleteRestaurant = async (req, res) => {
  const result = await queryDb(
    `DELETE FROM restaurant_category
    WHERE restaurant_id = ${req.body.resId})`,
  ) && await queryDb(
    `DELETE FROM restaurant 
    WHERE restaurant_id = ${req.body.resId})`,
  );
  return (result ? res.send('successfully deleted restaurant') : res.sendStatus(404));
};

const deleteCategory = async (req, res) => {
  console.log(req.params);
  const result = await queryDb(
    `DELETE FROM restaurant_category 
    WHERE restaurant_id = '${req.params.id}' 
    AND category_id = '${req.params.catId}'`,
  );
  return (result ? res.send('successfully deleted category') : res.sendStatus(404));
};

module.exports = {
  getRestaurantList,
  getRestaurantInfo,
  getRestaurant,
  getCategories,
  getAvgStars,
  postCategory,
  postRestaurant,
  patchRestaurant,
  patchCategory,
  deleteRestaurant,
  deleteCategory,
};

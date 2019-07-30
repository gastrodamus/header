const { Pool } = require('pg');
const axios = require('axios');

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

const getRestaurant = async (req, res) => {
  const restaurant = await pool.query(`SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`);
  res.send(restaurant.rows);
};

const getCategory = async (req, res) => {
  const categoryIds = await pool.query(`SELECT category_id FROM restaurant_category WHERE restaurant_id = ${req.params.id}`);
  const arr1 = categoryIds.rows.map(el => el.category_id);
  const category = await pool.query(`SELECT * FROM category WHERE category_id in (${arr1[0]}, ${arr1[1]}, ${arr1[2]})`);
  res.send(category.rows);
};

const getReview = async (req, res) => {
  const review = await axios.get(`http://localhost:4000/api/${req.params.id}/review`);
  res.send(review);
};

const postCategory = async (req, res) => {
  // req.body example: {"catId": 2}
  // update with new category id
  await pool.query(
    `INSERT INTO restaurant_category (restaurant_id, category_id) 
    VALUES (${req.params.id}, ${req.body.catId})`,
  );
  res.send('successfully added category');
};

const postRestaurant = async (req, res) => {
  // req.body example: {"resName": "Seafood", "resPrice": 35}
  await pool.query(
    `INSERT INTO restaurant (restaurant_name, price) 
    VALUES (${req.body.resName}, ${req.body.resPrice})`,
  );
  res.send('successfully added restaurant');
};

const patchRestaurant = async (req, res) => {
  await pool.query(
    `UPDATE restaurant
    SET restaurant_name = ${req.body.newRestaurant.resName}
    WHERE restaurant_id = ${req.params.id}`,
  );
  res.send('successfully patched restaurant');
};

const patchCategory = async (req, res) => {
  // req.body example: {"oldCatId": 2, "newCat": "Singaporean"}
  // retrieve new category id
  const newCat = await pool.query(`SELECT category_id FROM category WHERE category_name = '${req.body.newCat}'`);
  // update with new category id
  await pool.query(
    `UPDATE restaurant_category 
    SET category_id = ${newCat.rows[0].category_id}
    WHERE restaurant_id = ${req.params.id}
    AND category_id = ${req.body.oldCatId}`,
  );
  res.send('successfully patched category');
};

const deleteRestaurant = async (req, res) => {
  await pool.query(
    `DELETE FROM restaurant 
    WHERE restaurant_id = ${req.body.resId})`,
  );
  res.send('successfully deleted restaurant');
};

const deleteCategory = async (req, res) => {
  // req.body example: {"catId": 2, "resId": 1}
  await pool.query(
    `DELETE FROM restaurant_category 
    WHERE restaurant_id = '${req.params.id}' 
    AND category_id = '${req.body.catId}'`,
  );
  res.send('successfully deleted category');
};

module.exports = {
  getRestaurant,
  getCategory,
  getReview,
  postCategory,
  postRestaurant,
  patchRestaurant,
  patchCategory,
  deleteRestaurant,
  deleteCategory,
};

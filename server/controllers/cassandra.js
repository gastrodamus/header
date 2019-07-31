const cassandra = require('cassandra-driver');
const axios = require('axios');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'business',
});

const getRestaurantList = async (req, res) => {
  const result = await client.execute('SELECT * FROM restaurant limit 100');
  res.send(result.rows);
};

const getRestaurant = async (req, res) => {
  const restaurant = await client.execute(`SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`);
  res.send(restaurant.rows);
};

const getCategory = async (req, res) => {
  const restaurants = await client.execute(`SELECT * FROM restaurant_by_category WHERE restaurant_id = ${req.params.id}`);
  const categories = restaurants.rows.map(el => el.category);
  res.send(categories);
};

const getReview = async (req, res) => {
  const review = await axios.get(`http://localhost:4000/api/${req.params.id}/review`);
  res.send(review);
};

const postCategory = async (req, res) => {
  // req.body example: {"catId": 2}
  // update with new category id
  await client.execute(
    `INSERT INTO restaurant_by_category (restaurant_id, restaurant_name, category_id, category)
    VALUES (${req.params.resId}, ${req.body.res}, ${req.body.catId}, ${req.body.cat})`,
  );
  res.send('successfully added category');
};

const postRestaurant = async (req, res) => {
  // req.body example: {"resName": "Seafood", "resPrice": 35}
  await client.execute(
    `INSERT INTO restaurant (restaurant_name, price) 
    VALUES (${req.body.resName}, ${req.body.resPrice})`,
  );
  res.send('successfully added restaurant');
};

const patchRestaurant = async (req, res) => {
  await client.execute(
    `UPDATE restaurant
    SET restaurant_name = ${req.body.newRestaurant.resName}
    WHERE restaurant_id = ${req.params.id}`,
  );
  res.send('successfully patched restaurant');
};

const patchCategory = async (req, res) => {
  // req.body example: {"oldCatId": 2, "newCat": "Singaporean"}
  // retrieve new category id
  const newCat = await client.execute(`SELECT category_id FROM restaurant_by_category WHERE category_name = '${req.body.newCat}'`);
  // update with new category id
  await client.execute(
    `UPDATE restaurant_by_category 
    SET category_id = ${newCat.rows[0].category_id}
    WHERE restaurant_id = ${req.params.id}
    AND category_id = ${req.body.oldCatId}`,
  );
  res.send('successfully patched category');
};

const deleteRestaurant = async (req, res) => {
  await client.execute(
    `DELETE FROM restaurant 
    WHERE restaurant_id = ${req.body.resId})`,
  );
  res.send('successfully deleted restaurant');
};

const deleteCategory = async (req, res) => {
  // req.body example: {"catId": 2, "resId": 1}
  await client.execute(
    `DELETE FROM restaurant_category 
    WHERE restaurant_id = '${req.params.id}' 
    AND category_id = '${req.body.catId}'`,
  );
  res.send('successfully deleted category');
};

module.exports = {
  getRestaurantList,
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

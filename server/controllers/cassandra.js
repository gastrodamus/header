const cassandra = require('cassandra-driver');
const axios = require('axios');
const { types } = require('cassandra-driver');

const { Uuid } = types;

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'business',
});

const queryDb = async (q) => {
  try {
    const result = await client.execute(q);
    return result.rows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getRestaurantList = async (req, res) => {
  const result = await queryDb('SELECT * FROM restaurant limit 100');
  return (result ? res.send(result) : res.sendStatus(404));
};

const getRestaurant = async (req, res) => {
  const result = await queryDb(`SELECT * FROM restaurant WHERE restaurant_id = ${req.params.id}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const getCategories = async (req, res) => {
  const result = await queryDb(`SELECT * FROM restaurant_by_category WHERE restaurant_id = ${req.params.id}`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const getReviews = async (req, res) => {
  const result = await axios.get(`http://localhost:4000/api/${req.params.id}/review`);
  return (result ? res.send(result) : res.sendStatus(404));
};

const postCategory = async (req, res) => {
  // req.body example: {"catId": 2}
  // update with new category id
  const result = await queryDb(
    `INSERT INTO restaurant_by_category (restaurant_id, restaurant_name, category_id, category)
    VALUES (${req.params.resId}, ${req.body.res}, ${req.body.catId}, ${req.body.cat})`,
  );
  return (result ? res.send('successfully added category') : res.sendStatus(404));
};

const postRestaurant = async (req, res) => {
  // req.body example: {"resName": "Seafood", "resPrice": 35}
  const result = await queryDb(
    `INSERT INTO restaurant (restaurant_id, restaurant_name, price) 
    VALUES (${Uuid.random()}, ${req.body.resName}, ${req.body.resPrice})`,
  );
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

const patchCategory = async (req, res) => {
  // req.body example: {"oldCatId": 2, "newCatId": "5"}
  // update with new category id
  const result = await queryDb(
    `UPDATE restaurant_by_category 
    SET category_id = ${req.body.newCatId}
    WHERE restaurant_id = ${req.params.id}
    AND category_id = ${req.body.oldCatId}`,
  );
  return (result ? res.send('successfully patched category') : res.sendStatus(404));
};

const deleteRestaurant = async (req, res) => {
  const result = await queryDb(
    `DELETE FROM restaurant_by_category
    WHERE restaurant_id = ${req.body.resId})`,
  ) && await queryDb(
    `DELETE FROM restaurant 
    WHERE restaurant_id = ${req.body.resId})`,
  );
  return (result ? res.send('successfully deleted restaurant') : res.sendStatus(404));
};

const deleteCategory = async (req, res) => {
  // req.body example: {"catId": 2, "resId": 1}
  const result = await queryDb(
    `DELETE FROM restaurant_by_category 
    WHERE restaurant_id = '${req.params.id}' 
    AND category_id = '${req.params.catId}'`,
  );
  return (result ? res.send('successfully deleted category') : res.sendStatus(404));
};

module.exports = {
  getRestaurantList,
  getRestaurant,
  getCategories,
  getReviews,
  postCategory,
  postRestaurant,
  patchRestaurant,
  patchCategory,
  deleteRestaurant,
  deleteCategory,
};

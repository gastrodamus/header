const newrelic = require('newrelic');
const express = require('express');
const controllers = require('./controllers/postgres');

const router = express.Router();
const app = express();
const port = 3003;

app.use('/api/header', router);
app.use(express.json());

router.get('/', controllers.getRestaurantList);
router.get('/:id/restaurant', controllers.getRestaurant);
router.get('/:id/category', controllers.getCategories);
router.get('/:id/reviews', controllers.getReviews);

router.post('/:id/restaurant', controllers.postRestaurant);
router.post('/:id/category/:catId', controllers.postCategory);

router.patch('/:id/restaurant', controllers.patchRestaurant);
router.patch('/:id/category', controllers.patchCategory);

router.delete('/:id/restaurant', controllers.deleteRestaurant);
router.delete('/:id/category/:catId', controllers.deleteCategory);

app.listen(port, () => console.log(`Server listening on port ${port}`));

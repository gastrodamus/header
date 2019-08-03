const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const controllers = require('./controllers/postgres');
const { cache } = require('./cacheService');

const router = express.Router();
const app = express();
const port = 3003;

app.use(morgan('dev'));
// app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use('/api/header', router);
app.use(express.json());

router.get('/restaurants', controllers.getRestaurantList);
router.get('/:id', cache, controllers.getRestaurantInfo);
router.get('/:id/restaurant', cache, controllers.getRestaurant);
router.get('/:id/category', cache, controllers.getCategories);
router.get('/:id/review', cache, controllers.getAvgStars);

router.post('/:id/restaurant', cache, controllers.postRestaurant);
router.post('/:id/category/:catId', cache, controllers.postCategory);

router.patch('/:id/restaurant', cache, controllers.patchRestaurant);
router.patch('/:id/category', cache, controllers.patchCategory);

router.delete('/:id/restaurant', cache, controllers.deleteRestaurant);
router.delete('/:id/category/:catId', cache, controllers.deleteCategory);

app.listen(port, () => console.log(`Server listening on port ${port}`));

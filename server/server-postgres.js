const express = require('express');
const controllers = require('./controllers/postgres');

const router = express.Router();
const app = express();
const port = 3003;

app.use('/api', router);
app.use(express.json());

router.get('/:id/header', controllers.getRestaurant);
router.get('/:id/category', controllers.getCategories);
router.get('/:id/review', controllers.getReviews);

router.post('/:id/header', controllers.postRestaurant);
router.post('/:id/category/:catId', controllers.postCategory);

router.patch('/:id/header', controllers.patchRestaurant);
router.patch('/:id/category', controllers.patchCategory);

router.delete('/:id/header', controllers.deleteRestaurant);
router.delete('/:id/category/:catId', controllers.deleteCategory);

app.listen(port, () => console.log(`Server listening on port ${port}`));

import express from 'express';
import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import App from '../client/src/components/App.jsx';

const controllers = require('./controllers/postgres');
const { cache } = require('./cacheService');

const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

app.use('/api/header', router);
app.use(express.json());

app.get('/:id', (req, res) => {
  const body = renderToString(<App />);
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://kit.fontawesome.com/0c048ecc77.js"></script> 
      <title>Munch Header</title>
    </head>
    <body style="margin:0">
      <div id="app">
        <div id="header">
          ${body}
        </div>
      </div>
      <script src="./bundle.js"></script>
    </body>
  </html>
  `);
});

app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

router.get('/restaurants', cache, controllers.getRestaurantList);
router.get('/:id', cache, controllers.getRestaurantInfo);
router.get('/:id/restaurant', cache, controllers.getRestaurant);
router.get('/:id/category', cache, controllers.getCategories);
router.get('/:id/review', cache, controllers.getReviews);

router.post('/:id/restaurant', cache, controllers.postRestaurant);
router.post('/:id/category/:catId', cache, controllers.postCategory);

router.patch('/:id/restaurant', cache, controllers.patchRestaurant);
router.patch('/:id/category', cache, controllers.patchCategory);

router.delete('/:id/restaurant', cache, controllers.deleteRestaurant);
router.delete('/:id/category/:catId', cache, controllers.deleteCategory);

app.listen(port, () => console.log(`Server listening on port ${port}`));

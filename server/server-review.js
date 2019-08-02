const express = require('express');
const controllers = require('./controllers/review');
const { cache } = require('./cacheService');

const app = express();
const port = 4000;

app.get('/api/review/:id', cache, controllers.getReviews);
app.get('/api/review/avg/:id', cache, controllers.getAvgStars);
app.get('/api/review/dish/:id/:dishid', cache, controllers.getDishReview);

app.listen(port, () => console.log(`Server listening on port ${port}`));

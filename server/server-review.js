const express = require('express');
const controllers = require('./controllers/review');

const app = express();
const port = 4000;

app.get('/api/review/:id', controllers.getReviews);
app.get('/api/review/avg/:id', controllers.getAvgStars);
app.get('/api/review/dish/:id/:dishid', controllers.getDishReview);

app.listen(port, () => console.log(`Server listening on port ${port}`));

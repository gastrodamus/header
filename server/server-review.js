const express = require('express');
const controllers = require('./controllers/review');

const app = express();
const port = 4000;

app.get('/api/:id/review', controllers.getReview);
app.get('/api/:id/review/dish/:dishid', controllers.getDishReview);

app.listen(port, () => console.log(`Server listening on port ${port}`));

const express = require('express');
const controllers = require('./controllers/review');

const app = express();
const port = 4000;

app.get('/api/:id/review', controllers.getReview);
app.post('/api/:id/review', controllers.postReview);

app.listen(port, () => console.log(`Server listening on port ${port}`));

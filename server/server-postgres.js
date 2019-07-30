const express = require('express');
const controllers = require('./controllers/postgres');

const app = express();
const port = 3003;

app.use(express.json());

app.get('/api/:id/header', controllers.getHeader);
app.get('/api/:id/category', controllers.getCategory);
app.get('/api/:id/review', controllers.getReview);

app.post('/api/:id/header', controllers.postHeader);
app.post('/api/:id/category', controllers.postCategory);

app.patch('/api/:id/header', controllers.patchHeader);
app.patch('/api/:id/category', controllers.patchCategory);

app.delete('/api/:id/header', controllers.deleteHeader);
app.delete('/api/:id/category', controllers.deleteCategory);

app.listen(port, () => console.log(`Server listening on port ${port}`));

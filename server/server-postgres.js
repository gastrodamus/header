const express = require('express');
const db = require('./controllers');

const app = express();
const port = 3003;

app.use(express.json());

app.get('/api/:id/header', db.getHeader);
app.get('/api/:id/review', db.getReview);
app.get('/api/:id/category', db.getCategory);


app.post('/api/:id/header', db.postHeader);
app.post('/api/:id/category', db.postCategory);

app.patch('/api/:id/header', db.patchHeader);
app.patch('/api/:id/category', db.patchCategory);

app.delete('/api/:id/header', db.deleteHeader);
app.delete('/api/:id/category', db.deleteCategory);

app.listen(port, () => console.log(`Server listening on port ${port}`));

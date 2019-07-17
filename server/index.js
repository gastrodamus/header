const express = require('express')

const app = express();
const port = 3003;
const path = require('path');

const Business = require('./db/Business.js');

// app.use('/', express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.use('/:id', express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/header/:id', (req, res) => {
  console.log('getting: ', req.params.id)
  let query = Business.find({id: req.params.id});
  query.exec((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));

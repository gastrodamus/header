const express = require('express');

const app = express();
const port = 3000;
const path = require('path');

const Business = require('./db/Business.js');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.get('/munch/header', (req, res) => {
  console.log('get request received')
  var query = Business.find();
  query.exec((err, docs) => {
    if (err) {
      console.log(err)
    } else {
      res.send(docs)
    }
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));

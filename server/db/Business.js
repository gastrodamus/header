const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const businessSchema = new mongoose.Schema({
  name: String,
  avg_stars: Number,
  price: Number,
  categories: String,
  reviews: [{
    star: Number
  }]
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
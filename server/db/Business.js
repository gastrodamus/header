const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/munch';
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const businessSchema = new mongoose.Schema({
  name: String,
  avg_stars: Number,
  price: Number,
  categories: String,
  reviews: [{
    star: Number,
  }],
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;

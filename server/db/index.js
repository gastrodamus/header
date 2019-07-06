const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/munch';

const db = mongoose.connect(mongoUri, {useNewUrlParser: true});

module.exports = db;

const mongoose = require('mongoose');
const Cart = require('./Cart.model');
const dbConfig = require('./db.config.js');

const connectToMongoDB = () => {
  return mongoose.connect(dbConfig.url, { useNewUrlParser: true });
};

module.exports = connectToMongoDB;

const mongoose = require('mongoose');
const Cart = require('./Cart.model');
const dbConfig = require('./db.config.js');

const connectToMongoDB = () => {
  return mongoose.connect(dbConfig.url);
};

module.exports = connectToMongoDB;

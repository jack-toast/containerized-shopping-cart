// Cart schema model

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: String,
  make: String,
  model: String,
  year: Number,
  price: Number,
  color: String,
  count: Number
});

const cartSchema = new mongoose.Schema({
  userID: String,
  contents: [itemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

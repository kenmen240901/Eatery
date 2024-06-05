// backend/models/Item.js

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

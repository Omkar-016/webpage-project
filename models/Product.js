const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String // URL or path to image
});

module.exports = mongoose.model('Product', ProductSchema);

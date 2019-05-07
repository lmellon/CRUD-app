// schema for footwear listings

// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// model
const clothingSchema = Schema ({
  style: { type: String, required: true },
  gender: { type: String, required: true },
  brand: { type: String, required: true },
  model: String,
  imageURL: String,
  size: { type: String, required: true },
  quantity: { type: Number, min: 1 },
  price: { type: Number, min: 1}
});

// attach schema to collection
const Clothing = mongoose.model('Clothing',clothingSchema);

// export Shoe object
module.exports = Clothing;

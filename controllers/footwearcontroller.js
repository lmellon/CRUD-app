// dependcies and configs for footwear controller
const express = require('express');
const ftwrrouter = express.Router();
const Footwear = require('../models/footwear.js');
const seedProducts = require('../models/seed_footwear.js');

// use model and seed to create gallery
ftwrrouter.get('/seed', (req,res) => {
  Footwear.create(seedProducts,() => {
    res.redirect('footwear/footwear-index.ejs');
  });
});

ftwrrouter.get('/',(req,res) => {
  Footwear.find({}, (error, productData)=> {
  res.render('footwear/footwear-index.ejs',{
    products: productData
    });
  });
});


module.exports = ftwrrouter;

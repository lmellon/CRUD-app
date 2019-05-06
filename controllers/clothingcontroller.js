//++++++++++++++++++++++++++++
// Dependencies and configs for clothing controller
//++++++++++++++++++++++++++++
const express = require('express');
const clothrouter = express.Router();
const Clothing = require('../models/clothing.js');


//++++++++++++++++++++++++++++
// RESTful Routes
//++++++++++++++++++++++++++++

// NEW ROUTE
clothrouter.get('/new',(req,res) => {
  res.render('clothing/clothing-new.ejs')
});

// INDEX ROUTE
clothrouter.get('/',(req,res) => {
  Clothing.find({},(error,productData) => {
    res.render('clothing/clothing-index.ejs', {
      products: productData
    });
  });
});

// POST ROUTE
clothrouter.post('/', (req,res) => {
  Clothing.create(req.body,(error,createdItem) => {
    res.redirect('/clothing');
  });
});


//++++++++++++++++++++++
module.exports = clothrouter;

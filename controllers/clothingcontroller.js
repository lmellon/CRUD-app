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

// DELETE ROUTE
clothrouter.delete('/:id',(req,res) => {
  Clothing.findByIdAndDelete(req.params.id, (error, data) => {
    res.redirect('/clothing');
  });
});

// INDEX ROUTE
clothrouter.get('/',(req,res) => {
  Clothing.find({},(error,productData) => {
    res.render('clothing/clothing-index.ejs', {
      products: productData
    });
  });
});

// SHOW ROUTE
clothrouter.get('/:id', (req,res) => {
  Clothing.findById(req.params.id, (error,foundItem) => {
    res.render('clothing/clothing-show.ejs', {
      clothes: foundItem
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

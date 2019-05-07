//++++++++++++++++++++++++++++
// Dependencies and configs for clothing controller
//++++++++++++++++++++++++++++
const express = require('express');
const clothrouter = express.Router();
const Clothing = require('../models/clothing.js');
const seedProducts = require('../models/seed_clothing.js')

// use model and seed to create gallery
clothrouter.get('/seed', (req,res) => {
  Clothing.create(seedProducts,() => {
    res.redirect('/');
  });
});


//++++++++++++++++++++++++++++
// RESTful Routes
//++++++++++++++++++++++++++++

// put route to adjust quantity
clothrouter.put('/add/:id', (req,res) => {
  Clothing.findByIdAndUpdate(req.params.id, {$inc:{quantity: -1}}, {new:true},(error, addedItem) => {
    res.render('clothing/clothing-show.ejs',{
      clothes: addedItem
    });
  });
});

// PUT ROUTE
clothrouter.put('/:id', (req,res) => {
  Clothing.findByIdAndUpdate(req.params.id, req.body, { new: true}, (error, updatedItem) => {
    res.render('clothing/clothing-show.ejs',{
      clothes: updatedItem
    })
  });
});

// EDIT ROUTE
clothrouter.get('/:id/edit', (req,res) => {
  Clothing.findById(req.params.id,(error,foundItem) => {
    res.render('clothing/clothing-edit.ejs', {
      clothes: foundItem
    });
  });
});

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

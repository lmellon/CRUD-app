//++++++++++++++++++++++++++++
// Dependencies and configs for footwear controller
//++++++++++++++++++++++++++++
const express = require('express');
const ftwrrouter = express.Router();
const Footwear = require('../models/footwear.js');
const seedProducts = require('../models/seed_footwear.js');


// use model and seed to create gallery
ftwrrouter.get('/seed', (req,res) => {
  Footwear.create(seedProducts,() => {
    res.redirect('/');
  });
});

//++++++++++++++++++++++++++++
// RESTful Routes
//++++++++++++++++++++++++++++


// put route to adjust quantity
ftwrrouter.put('/add/:id', (req,res) => {
  Footwear.findByIdAndUpdate(req.params.id, {$inc:{quantity: -1}}, {new:true},(error, addedItem) => {
    res.render('footwear/footwear-show.ejs',{
      shoes: addedItem
    });
  });
});


// EDIT ROUTE
// part 2 of editing a listing.  takes info you entered and puts it in place on the id page.
ftwrrouter.put('/:id', (req,res) => {
  Footwear.findByIdAndUpdate(req.params.id, req.body,{new:true},(error, updatedItem) => {
    res.render('footwear/footwear-show.ejs',{
      shoes: updatedItem
    });
  });
});


// EDIT ROUTE
// part 1. go to an edit page and get the info
ftwrrouter.get('/:id/edit',(req,res) => {
  Footwear.findById(req.params.id, (error, foundItem) => {
    res.render('footwear/footwear-edit.ejs', {
      shoes: foundItem
    });
  });
});


// NEW ROUTE
// takes you to the page where you can create a new listing.
ftwrrouter.get('/new',(req,res) => {
  res.render('footwear/footwear-new.ejs');
});


// DELETE ROUTE
// removes an item completely and brings you back to the footwear index page
ftwrrouter.delete('/:id',(req,res) => {
  Footwear.findByIdAndDelete(req.params.id, (error, data) => {
    res.redirect('/footwear');
  });
});

// INDEX ROUTE
// displays the seed items on the index page of the footwear category
ftwrrouter.get('/',(req,res) => {
  Footwear.find({}, (error, productData)=> {
    res.render('footwear/footwear-index.ejs',{
      products: productData
    });
  });
});

//  ROUTE FOR MENS FILTER
ftwrrouter.get('/mens',(req,res) => {
  Footwear.find({gender: "Men's"}, (error, productData) => {
    console.log(productData);
    res.render('footwear/footwear-filtered-mens.ejs',{
      products: productData
    })
  });
});


//SHOW ROUTE
// displays all the details of the product on its own page
ftwrrouter.get('/:id', (req,res) => {
  Footwear.findById(req.params.id, (error,foundItem) => {
    res.render('footwear/footwear-show.ejs', {
      shoes: foundItem
    });
  });
});

// POST ROUTE
// part 2 of creating a new listing.  this takes the info you entered and dispalys it on the index page as the next listed item
ftwrrouter.post('/', (req,res) => {
  Footwear.create(req.body,(error,createdItem) => {
    res.redirect('/footwear');
  });
});

//++++++++++++++++++++++
module.exports = ftwrrouter;

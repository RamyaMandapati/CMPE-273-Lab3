var express = require('express');
var app = express.Router();
//var kafka = require('./kafka/client');
const multer = require('multer');
const FormData = multer();
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')
const loginpage=require('../models/login');
// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
app.get("/getSearchItems/:SearchTerms", (req, res) => {
    console.log("get Search Items -------------------------------");
    const searchValue = req.params.SearchTerms;
    console.log(searchValue);
    
  
    products.find({ productname: { $regex: searchValue } },
      (err, result) => {
        console.log(result);
        if (err) {
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      }
    );
  });  
  
  module.exports=app;
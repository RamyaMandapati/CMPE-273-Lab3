
var express = require('express');
var app = express.Router();
//var kafka = require('./kafka/client');
const multer = require('multer');
const FormData = multer();
const loginpage=require('../models/login');
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')

// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
app.post("/addProductToCart/:userid", (req, res) => {
    const userId = req.params.userid;
    const itemId = req.body.itemId;
    const qty = req.body.qty;
    console.log(itemId);
    console.log(qty);
    console.log("update cart");
    const filter={cuser_id:userId,
      cproduct_id:itemId};
      const updatec={
        cuser_id:userId,
        cproduct_id:itemId,
        
        quantity:qty
      }
      kafka.make_request('addTocart',{"body":req.body,"id":userId}, function(err,result){
        if (err) {
          console.log(err);
          res.status(500).json({ responseMessage: 'Database not responding' });
        }
        else if (result.status === 200)
        {
          console.log("Product added to cart");
          res.send({success:true,result})
        } 
      });
    // cart.updateOne(filter,
    //   {$setOnInsert:updatec},{upsert:true},
      
    //   (err, result) => {
    //     console.log(result);
    //     if (err) {
    //       console.log(err);
    //       res.send(err);
    //     } else {
    //       res.send({ success: true, result });
    //     }
    //   })
    
  });

  app.post("/delcart/:userid/:itemId",(req,res)=>{
    const userId = req.params.userid;
    const itemId = req.params.itemId;
    

    cart.deleteOne({cproduct_id:itemId,cuser_id:userId},
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      }
    );
  })
  app.post("/deletefullCart/:userid",(req,res)=>{
    const userId = req.params.userid;

    console.log("inside delete user cart")

    cart.deleteMany({cuser_id:userId},
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      }
    );
  })
  app.get("/getFinalCartProducts/:userid", (req, res) => {
    const userId = req.params.userid;
    console.log("Getting all products in cart");
    kafka.make_request('getCart',{"id":userId}, function(err,result){
      if (err) {
        console.log(err);
        res.status(500).json({ responseMessage: 'Database not responding' });
      }
      else
      {
        console.log("getting products in cart");
        res.send({success:true,result})
      } 
    })
  });
  app.put("/updateCartQuantity/:userId", (req, res) => {
    const userId = req.params.userId;
    // const userId = req.params.id;
    const itemId = req.body.itemId;
    const qty = req.body.qty;
  
    console.log("In update cart");
    console.log(itemId);
    console.log(qty);
    console.log(userId);
    const filter={cuser_id:userId,cproduct_id:itemId};
    const update={quantity:qty};
    cart.updateOne(filter,update,
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      }
    );
  });
  app.get("/getQty/:userid/:productid", (req, res) => {
    const userId = req.params.userid;
    const productId=req.params.productid
    console.log("user"+userId);
    console.log("product "+productId)
    console.log("Getting all products in home");
    cart.find({cuser_id:userId,cproduct_id:productId},{quantity:1},
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send({ success: true, result });
        }
      }
    );
  });
  module.exports=app;
  
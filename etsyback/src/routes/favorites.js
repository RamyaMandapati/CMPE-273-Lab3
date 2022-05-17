var express = require('express');
var app = express.Router();

const multer = require('multer');
const FormData = multer();
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')
const loginpage=require('../models/login');
// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');


app.post("/addFav/:productid/:userid", (req, res) => {
    const userId = req.params.userid;
    console.log(userId);
    const itemId = req.params.productid;
    console.log(itemId);

    kafka.make_request('addToFav',{"item":itemId,"id":userId}, function(err,result){
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
    // const filter={user_id:userId,
    //   product_id:itemId};
    //   const updatec={
    //     user_id:userId,
    //     product_id:itemId,
        
       
    //   }
    
    // favoritespage.updateOne(filter,
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
  app.get("/getFav/:userid", (req, res) => {
    const userId = req.params.userid;
    console.log(userId);
    console.log("Getting all favoutrites in home");
    
    favoritespage.find({user_id:userId}).populate("product_id")
      .then((result)=>{
        console.log(result);
        res.send({success:true,result})
      })
      .catch((err)=>{
        res.send(err);
      })
  });
  module.exports=app;
  
 


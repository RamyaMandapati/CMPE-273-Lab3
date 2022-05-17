var express = require('express');
var app = express();
const saltRounds=10;
var mongoose = require('mongoose');
//var kafka = require('./kafka/client');
const multer = require('multer');
const FormData = multer();
const loginpage=require('../models/login');
const products=require("../models/products")
const cart=require('../models/cart');
// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');

const bcrypt=require('bcrypt');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var config = require('../config/settings');
    
    var connStr = 'mongodb+srv://admin:admin@cluster0.s2eap.mongodb.net/Etsy?retryWrites=true&w=majority'
    //var connStr = config.connection_string;
    console.log(connStr);
    mongoose.connect(connStr, { useNewUrlParser: true, maxPoolSize: 10, }, function (err) {
        if (err) throw err;
        else {
            console.log('Successfully connected to MongoDB');


       
            
            const product=new products(
                {
                  productname:msg.itemName,
                  price:msg.itemPrice,
                  description:msg.itemDescriprion,
                  count:msg.itemCount,
                  image:msg.itemImage,
                  category:msg.itemCategory,
                  id:msg.userid,
                  shopname:msg.shopname
      
                }
              )
              try{
          
                          const a1=product.save()
                          callback(null, { status: 200});
                          
                        }
                        catch(err){
                            console.log(err);
                            callback(err, "Database Error");
                        }
        }


    
        })
    }
  
  
    exports.handle_request = handle_request;

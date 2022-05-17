var express = require('express');
var app = express();
const saltRounds=10;
var mongoose = require('mongoose');
//var kafka = require('./kafka/client');
const multer = require('multer');
const FormData = multer();
const loginpage=require('../models/login');
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
            query={emailid:msg.emailid};
            loginpage.find(query,
                (err,result)=>{
                    if(err){
                        //throw err;
                        callback(err,"Error");
                    }
                    if(result.length > 0){
                        console.log("user already exists");
                        callback(null, { status: 401, result });
                    }
                    else{
                    
                        bcrypt.hash(msg.password,saltRounds,(err,hash) =>{
        
                                    if(err){
                                        console.log(err);  
                                    }
                                    const login=new loginpage({
                                            name:msg.username,
                                            password:hash,
                                            emailid: msg.emailid,
                                          })
                                        
                                          try{
                                            
                                            const a1=login.save()
                                            console.log("User Signup Successful");
                                            callback(null, { status: 200});
                                            
                                          }
                                          catch(err){
                                            callback(err, "Database Error");
                                          }
                    })
                    
                }
            });
        }
            })
        }
  
  
    exports.handle_request = handle_request;

var express = require('express');
var app = express();
const saltRounds=10;
var mongoose = require('mongoose');
//var kafka = require('./kafka/client');
const multer = require('multer');
const FormData = multer();
const loginpage=require('../models/login');
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
            console.log(msg.emailid);
           loginpage.find(query,
            (err,result)=>{
                if(err){
                    //throw err;
                    callback(err,"Error");
                }
                if(result.length > 0){
                    console.log("user already exists");
                    callback(null, { status: 401, result });
                }else{
                    
                    bcrypt.hash(msg.password,saltRounds,(err,hash) =>{
    
                                if(err){
                                    console.log(err);  
                                }
                                var userData = {
                                    "name": msg.username,
                                    "emailid": msg.emailid,
                                    "password": hash,
                                    
                                }
                            console.log("in post register api")
                         loginpage.create(userData, function (err, user) {
                            if (err) {
                                console.log("unable to insert into database", err);
                                callback(err, "Database Error");
                            } else {
                                console.log("User Signup Successful");
                                callback(null, { status: 200, user });
                            }
                        });
                })
                
            }
        });
    }
        })
    }
  
  
    exports.handle_request = handle_request;

// exports.loginSignupService = function loginSignupService(msg, callback) {
//   console.log("In Login Signup Service path:", msg.path);
//   switch (msg.path) {
//       case "userSignup":
//           userSignup(msg, callback);
//           break;
//       case "login":
//           login(msg, callback);
//           break;
//   }
// };

// function userSignup(msg, callback) {

//   console.log("In userSignup topic service. Msg: ", msg);
//   loginpage.findOne({ emailid: msg.formatEmail }, function (err, rows) {
//       if (err) {
//           console.log(err);
//           console.log("unable to read the database");
//           callback(err, "Database Error");
//       } else {
//           if (rows) {
//               console.log("User already exists");
//               callback(null, { status: 401, rows });
//           } else {
//               bcrypt.newHash(msg.body.password, function (response) {
//                   enPassword = response;
//                   console.log("Encrypted password: " + enPassword);
                 
//                   var userData = {
//                       "name": msg.body.name,
//                       "emailid": msg.formatEmail,
//                       "password": enPassword,
                   
//                   }
//                   //Save the user in database
//                   loginpage.create(userData, function (err, user) {
//                       if (err) {
//                           console.log("unable to insert into database", err);
//                           callback(err, "Database Error");
//                       } else {
//                           console.log("User Signup Successful");
//                           callback(null, { status: 200, user });
//                       }
//                   });
//               });
//           }
//       }
//   });
// }


// function login(msg, callback) {

//   console.log("In login topic service. Msg: ", msg);
  
//   loginpage.findOne({ emailid: msg.formatEmail }, function (err, user) {
//       if (err) {
//           console.log(err);
//           console.log("unable to read the database");
//           callback(err, "unable to read the database");
//       } else if (user) {
//           console.log("user:", user)
//           bcrypt.compareHash(msg.body.password, user.password, function (err, isMatch) {
//               if (isMatch && !err) {
//                   console.log("Login Successful");
//                   callback(null, {status: 200, user});
//                   console.log("creating token");
//               } else {
//                   console.log("Authentication failed. Passwords did not match");
//                   callback(null, {status: 400});
//               }
//           })
//       } else {
//           callback(null, {status: 400});
//       }
//   });

// }
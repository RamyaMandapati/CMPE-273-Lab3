var express = require('express');
var app = express();

const multer = require('multer');
const FormData = multer();
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')
const loginpage=require('../models/login');
const orderspage=require('../models/orders');
// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');

const {typeDxsefs}=require("../../schema/TypeDefs")
const {ApolloServer}=require("apollo-server-express");




app.post("/updateOrders/:userid",(req,res)=>{
    const uid=req.params.userid;
    const ordervalue=req.body.subtotal;
    const pid=req.body.itemId;
    const qty=req.body.quantity;
    const checked=req.body.giftmessage;
    console.log(uid);
    console.log(ordervalue);
    console.log(pid);
    console.log(qty);
    console.log(checked)
    console.log("in post update orders")
   
    if(checked){
    const order=new orderspage({
      ouser_id:uid,
      oproduct_id:pid,
      oquantity:qty,
      odate:  new Date(),
      checked:checked,
    })
  
    try{
      
      const a1=order.save()
      res.json(a1);
      
    }
    catch(err){
      res.send("error")
    }
  }else{
    const order=new orderspage({
      ouser_id:uid,
      oproduct_id:pid,
      oquantity:qty,
      odate:new Date(),
    })
  
    try{
      
      const a1=order.save()
      res.json(a1);
      
    }
    catch(err){
      res.send("error")
    }
    
  }
  })
  app.get("/getOrders/:userid",(req,res)=>{
    const userId = req.params.userid;
    console.log("Getting all products in orders");
    orderspage.find({ouser_id:userId}).populate('oproduct_id')
    .then((result)=>{
        console.log(result)
        res.send({success:true,result})
    }).catch((err)=>{
        res.send(err);
    })
  })
  module.exports=app;
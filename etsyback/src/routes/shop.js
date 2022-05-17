var express = require('express');
var app = express.Router();
//var kafka = require('./kafka/client');
const multer = require('multer');
const FormData = multer();
var bodyParser = require('body-parser');
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')
const loginpage=require('../models/login');
// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
const multerS3 = require('multer-s3');
const aws=require('aws-sdk')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
require("dotenv").config({ path: "../../config.env" });
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});
const upload = (bucketName) =>
  //console.log("bucket"+bucketName);
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `ProductImage-${Date.now()}.jpeg`);
      }
    }),
  });

app.get('/updateshopImage/:user_id',async (req,res)=>{
    const query={_id:req.params.user_id}
    
    loginpage.find(query,{shopimage:1},(err,result)=>{
        if(err){
            res.send({error:err});
        }else{

            res.send({success:"true",result})
            console.log()
        }
    })

})
app.post("/updateshopImage/:user_id",async (req, res) => {
  console.log("updateimage"+req.body);
  const uploadSingle = upload("etsyimage-bucket").single("itemImage");
      //console.log(req.body.itemName);
      console.log("abc");
      uploadSingle(req, res, async (err) => {

      const itemImage=req.file.location
      const query={_id:req.params.user_id};
      const update ={shopImage: req.file.location};
      

      console.log(itemImage);
      
      loginpage.findOneAndUpdate(query,update,
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ success: "false" });
          } else {
            
            res.send({ success: "true" ,shopimage:itemImage});
          }
        }
      );
    });
 
});
app.post('/getShopName',(req,res) =>{
  let shop_name=req.body.shopname
  console.log(shop_name)
  var query={shopname:shop_name}
 products.find(query,(err,result) => {
     console.log(result);
     if(result.length>0){
         res.json({message:"NotAvailable"})
     }else{
         res.status(200).json({message:"Available"})
     }
 })
})

app.post('/addShop/:id',(req,res) =>{
 let update={shopname:req.body.shopname}
 let filter={_id:req.params.id}
 loginpage.findOneAndUpdate(filter,update,
 (err,result) =>{
     if(err){
         res.send("adding shop failed")
     }
     else{
         res.send("success")
     }
 })
})
app.get("/getOwner/:userid",(req,res)=>{
  const id=req.params.userid;
  login.find({_id:id},
    (err,result)=>{
    if(err){
      res.send(err);
    }else{
      res.send({success:true,result});
    }
  }
  );
}) 
module.exports=app;
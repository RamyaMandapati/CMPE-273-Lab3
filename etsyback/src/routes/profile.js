var express = require('express');
var app = express.Router();
//var kafka = require('./kafka/client');
const multer = require('multer');
var bodyParser = require('body-parser');
const FormData = multer();
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')
const loginpage=require('../models/login');
// Set up middleware
var jwt = require('jsonwebtoken');
const multerS3 = require('multer-s3');
const aws=require('aws-sdk');
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
app.post("/profile",async (req,res)=>{

          
  const uploadSingle = upload("etsyimage-bucket").single("userImage");
  //console.log(req.body.itemName);
  console.log("abc");
  uploadSingle(req, res, async (err) => {

  const itemImage=req.file.location
        const update={
       name : req.body.userName,
        about : req.body.about,
         gender : req.body.gender,
         dob : req.body.dob,
         profileimage : req.file.location,
       country : req.body.country,
       profileimage:req.file.location
      }
      const filter={
       _id:req.body.id
      }
    
        loginpage.findOneAndUpdate(filter,update,
          (err, result) => {
            if (err) {
              console.log(err);
              res.send({ message: "error" });
            } else {
              res.send({ message: "success", result});
            }
          }
        );
      });
   
        }); 
        module.exports=app;
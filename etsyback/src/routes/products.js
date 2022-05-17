var express = require('express');
    
 var bodyParser = require('body-parser');



 

require('dotenv').config();
 require("dotenv").config({ path: "../../config.env" });

const multer = require('multer');
const FormData = multer();
const products=require('../models/products');
const favoritespage=require('../models/favorites');
const cart=require('../models/cart')
const loginpage=require('../models/login');
const aws=require('aws-sdk')
var app = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require('fs');
app.use(express.json());
var jwt = require('jsonwebtoken');
var passport = require('passport');

// Set up middleware  

const multerS3 = require('multer-s3');
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

var auth=passport.authenticate('jwt', {session:false})
app.post('/getProducts',(req,res)=>{
  console.log("abc"+req.headers);
    let limit=req.body.limit? parseInt(req.body.limit):100;
    let skip=parseInt(req.body.skip);
   
    products.find(function(err, result){
    
        console.log(result);
        if(err){

            res.status(400).json({success:false, err})
        }else{

            res.status(200).json({ success:true, result , postSize:result.length})
        }
    }).limit(limit).skip(skip)
}
)
app.post("/addProductShop/:shop", async (req, res) => {
   
     
      console.log("In add products");
      console.log(req.file);
      const uploadSingle = upload("etsyimage-bucket").single("itemImage");
      //console.log(req.body.itemName);
      console.log("abc");
      uploadSingle(req, res, async (err) => {
        if (err) {console.log(err)};
        console.log(req.file);
        console.log(req.file.location);
        console.log("-----------------------------------");
        console.log(req.body);
  
        console.log("in add product");
        const itemName = req.body.itemName;
        const itemDescriprion = req.body.itemDescription;
        const itemPrice = req.body.itemPrice;
        const itemCount = req.body.itemCount;
        const itemImage = req.file.location;
        const itemCategory = req.body.itemCategory;
        const userid=req.body.id;
        const shopname=req.params.shop;

        console.log("s"+shopname);
        console.log("i"+itemImage);
        const product=new products(
          {
            productname:itemName,
            price:itemPrice,
            description:itemDescriprion,
            count:itemCount,
            image:itemImage,
            category:itemCategory,
            id:userid,
            shopname:shopname

          }
        )
        try{
    
                    const a1=product.save()
                    res.send( { status: 200});
                    
                  }
                  catch(err){
                      console.log(err);
                      res.send(err, "Database Error");
                  }
  



  })
})  

  app.post("/getAllProducts/:user_id", (req, res) => {
    
    const limit = req.body.limit ? parseInt(req.body.limit) : 100;
    const skip = parseInt(req.body.skip);
    const userid=req.params.user_id;
    console.log(userid);
   
    var query={id:userid}
    
   products.find(query,(err, result) => {
        
        if (err) {
          console.log("err");
          res.send(err + "err");
        } else {
          console.log(result + "result");
          res
            .status(200)
            .json({ success: true, result, postSize: result.length });
        }
      }
    ).limit(limit).skip(skip);
  });
  

  app.get('/editProduct/:product_id',async (req,res)=>{
      const query={_id:req.params.product_id}
      
      products.find(query,
      (err,result)=>{
          if(err){
              res.send({error:err});
          }else{
              res.send({success:"true",result})
          }
      })

  })
  app.post('/editProduct/:product_id',async(req,res)=>{
      console.log("in post");
      
      const filter={_id:req.params.product_id}
       const update={  
           productname :req.body.itemName,
           description : req.body.itemDescription,
          price : req.body.itemPrice,
          count : req.body.itemCount,
     
          category : req.body.itemCategory,
       }
         
          console.log(req.body.itemName);
          products.findOneAndUpdate(filter,update,
            (err, result) => {
              if (err) {
                console.log(err);
                res.send({ message: "error" });
              } else {
                res.send({ message: "success" });
              }
            }
          );
        });
        app.post("/updateImage/:product_id",async (req, res) => {
            console.log(req.body);
            const uploadSingle = upload("etsyimage-bucket").single("itemImage");
            //console.log(req.body.itemName);
            console.log("abc");
            uploadSingle(req, res, async (err) => {
              if (err) {console.log(err)};
              console.log(req.file);
              console.log(req.file.location);
              console.log("-----------------------------------");
              console.log(req.body);
          
                
                const filter={_id:req.params.product_id}
                const update={image :req.file.location};
                
          
                console.log(req.file.location);
                
                products.findOneAndUpdate(filter,update,
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      res.send({ success: "false" });
                    } else {
                      res.send({ success: "true" });
                    }
                  }
                );
              });
            
          });
          app.get('/getProducts/:productid',async(req,res)=>{
            var query={ _id:req.params.productid}
            console.log(req.params.productid);
           
            products.find(query,
            (err,result) =>{
                console.log(result);
                if(err){
       
                    res.status(400).json({success:false, err})
                }else{
       
                    res.status(200).json({ success:true, result })
                }
            })
        }
        )
        app.post("/getAllProductstoCustomer/:user_id", (req, res) => {
    
   
            const userid=req.params.user_id;
            console.log(userid);
          
            products.find({id:userid},
              (err, result) => {
                
                if (err) {
                  console.log("err");
                  res.send(err + "err");
                } else {
                  console.log(result + "result");
                  res.json({ success: true, result});
                }
              }
            );
          });
          app.post("/editCount/:id",(req,res)=>{
            const productid=req.params.id;
            const quantity=req.body.quantity;
            console.log(productid);
            console.log(quantity);
            const filter={_id:productid};
            
            products.updateOne(filter,{$inc:{count:-quantity,sales:quantity}},
              (err,result)=>{
                if(err){
                  console.log(err);
                }else{
                  res.send({success:true});
                }
              }
            )
          })
      
          module.exports=app;


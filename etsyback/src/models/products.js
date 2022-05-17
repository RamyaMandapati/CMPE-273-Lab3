
const mongoose=require('mongoose');
const login = require('./login');

//const login =mongoose.model(login);
const products=new mongoose.Schema({
    productname:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    
    },
    shopname:{
        type:String,
        required:true
    },
    image:{
        type : String,
        
        
        required:true
    },
    category:{
        type:String,
        default:"jewellery",
        required:true
        
    },
    description:{
        type:String,
        
        
    },
    count:{
        type:Number,
        default:0,
        required:true
        
        
    },
    id:{
        type:mongoose.Schema.Types.ObjectId, ref: login,
       required:true
        
    },
    sales:{
        type:Number,
        default:0
        
        
    }


   
})
module.exports=mongoose.model('products',products);
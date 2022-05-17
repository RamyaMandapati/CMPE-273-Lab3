const mongoose=require('mongoose')
const login = require('./login');
const products=require('./products')
const orders=new mongoose.Schema({
    ouser_id:{
        type: mongoose.Schema.Types.ObjectId, ref: login,
        required:true
    },
    oproduct_id:{
        type:mongoose.Schema.Types.ObjectId, ref: products,
        required:true
    
    },
    oquantity:{
        type:Number,
        required:true
    },
    odate:{
        type:Date,
        required:true
    },
    checked:{
        type:String,
        
    },
},{
    strictPopulate: false
})

module.exports=mongoose.model('orders',orders);
const mongoose=require('mongoose')
const login = require('./login');
const products=require('./products')
const cart=new mongoose.Schema({
    cuser_id:{
        type: mongoose.Schema.Types.ObjectId, ref: login,
        required:true
    },
    cproduct_id:{
        type:mongoose.Schema.Types.ObjectId, ref: products,
        required:true
    
    },
    quantity:{
        type:Number,
        required:true
    },
})

module.exports=mongoose.model('cart',cart);
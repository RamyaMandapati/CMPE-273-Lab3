const mongoose=require('mongoose');
const login = require('./login');
const products=require('./products')

//const login =mongoose.model(login);
const favorites=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId, ref: login,
        required:true
        
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId, ref: products,
        required:true
       
    }
})
module.exports=mongoose.model('favorites',favorites);
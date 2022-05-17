
const mongoose=require('mongoose')

const login=new mongoose.Schema({
    emailid:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    
    },
    password:{
        type:String,
        required:true
    },
    
    shopname:{
        type:String,
       
        
    },
    shopImage:{
        type:String,
        default:"https://etsyimage-bucket.s3.us-west-1.amazonaws.com/profilepicture.png"
        
    },
    profileimage:{
        type:String,
        default:"https://etsyimage-bucket.s3.us-west-1.amazonaws.com/profilepicture.png"
        
    },
    gender:{
        type:String,
       
        
    },
    country:{
        type:String,
        
        
    },
    dob:{
        type:String,
        
        
    },
    about:{
        type:String,
      
        
    },
    address:{
        type:String,
      
        
    },
    phone:{
        type:Number,
      
        
    },
    




})
module.exports=mongoose.model('login',login);
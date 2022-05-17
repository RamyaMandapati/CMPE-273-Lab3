const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const express=require('express');
const app=express(); 
const mongoose=require('mongoose');
const url='mongodb+srv://admin:admin@cluster0.s2eap.mongodb.net/Etsy?retryWrites=true&w=majority';


var session= require('express-session');
var cors=require('cors');
app.set("viewengine","ejs");

var constants= require("./config.json");
app.use(express.json());
app.use(bodyParser.json());
const jwt=require('jsonwebtoken');



app.use(cors({origin:constants.frontend, 
  methods:['GET','POST','PUT'],
  credentials:true}));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(session({
    key:"userID",
    secret: 'etsyback',
    resave: false,
    saveUninitialized : false,
    duration : 60*60*1000,
    activeDuration : 5*60*1000,
    cookie:{
        expires: 60*60*24,
   
    },
}));
var dbConnection=mongoose.connection;
const passport=require('passport');


require('./config/passport');
app.use(passport.initialize());
const { ApolloServer, gql } = require('apollo-server');

const typeDefs=require("./schema/TypeDefs");
const resolvers=require("./schema/resolvers");


const server=new ApolloServer({
  typeDefs,
  resolvers ,
  csrfPrevention: true,
});



var loginSignupRoutes = require('./src/routes/login');
var profileRoutes = require('./src/routes/profile');
var cartRoutes = require('./src/routes/cart');
var favoritesRoutes = require('./src/routes/favorites');
var ordersRoutes = require('./src/routes/orders');
var productsRoutes = require('./src/routes/products');
var searchRoutes = require('./src/routes/search');
var shopRoutes= require('./src/routes/shop');


app.use('/', profileRoutes);

app.use('/', productsRoutes);

app.use('/',shopRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
mongoose.connect(url,{useNewUrlParser:true})
.then(()=>{
  console.log("conected to db");
  return server.listen({port:4000});
})
.then((res )=> {
  console.log(`🚀  Server ready at ${res.url}`)
});



var express = require('express');
var app = express();

var config = require('../../config/settings');
const multer = require('multer');
const FormData = multer();
const loginpage=require('../models/login');
// Set up middleware
var jwt = require('jsonwebtoken');
var passport = require('passport');
var saltRounds=10;
const bcrypt=require('bcrypt');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});


// app.post('/register',(req,res)=>{
   
//     const passwordl=req.body.password
//      bcrypt.hash(passwordl,saltRounds,(err,hash) =>{
    
//         if(err){
//             console.log(err);  
//         }
//     console.log("in post register api")
//   const login=new loginpage({
//     name:req.body.username,
//     password:hash,
//     emailid: req.body.emailid,
//   })

//   try{
    
//     const a1=login.save()
//     res.json(a1);
    
//   }
//   catch(err){
//     res.send("error")
//   }
//  })
// })



//  app.get("/login",(req,res)=>{
//      if(req.session.user){
//          res.send({loggedIn: true, user: req.session.user})
//      }
//      else{
//          res.send({loggedIn:false});
//      }
//  })   
app.post("/login",(req,res) =>
{
    
    const emailid_login=req.body.emailid;
    const password_login=req.body.password;
    
    var query = {emailid: emailid_login}
    loginpage.find(query, function(err, result){
      if(err) throw new Error(err);
      if(!result) 
        console.log('Not found');
      else {
        console.log('Found!');


            
                console.log(result);
                
                bcrypt.compare(password_login,result[0].password,(error,response) =>{
                    if(response){
                         const payload={
                            username:result[0].name,
                            id:result[0]._id,
                        
                            emailid:result[0].emailid
                        }
                        
                        req.session.user=result;
                        const accessToken=jwt.sign(payload, "CMPE273", { expiresIn : "1d"})
                        
                        res.send(
                            {success: true,
                            
                            token: accessToken,
                            result}
                        )
                            }
                            else{
                              res.send("Password incorrect");
                            }
                });
            }

            
            
        })
 
  
        
})

app.post('/register',(req,res)=>{
   
  console.log("Inside signup post request");
  console.log("Request Body:");
  console.log(req.body);
  let formatEmail = req.body.emailid;
  console.log("formatted email:" + formatEmail);

  kafka.make_request('RegisterTopic',req.body, function(err,result){
    if (err) {
      console.log(err);
      res.status(500).json({ responseMessage: 'Database not responding' });
    }
    else if (result.status === 200)
    {
      console.log("User Added");
      res.status(200).json({ responseMessage: 'Successfully Added!' });
    } else if (result.status === 401){
      console.log("User already exists");
      res.status(200).json({ responseMessage: 'User Already exists!' });
    }
  });
})


//const accessToken=jwt.sign(payload, "CMPE273", { expiresIn : "1d"})
//  app.get("/login",(req,res)=>{
//      if(req.session.user){
//          res.send({loggedIn: true, user: req.session.user})
//      }
//      else{
//          res.send({loggedIn:false});
//      }
//  })   
// app.post("/login",(req,res) =>
// {
    
//   console.log("Inside login post request");
//   console.log("Request Body:");
//   console.log(req.body);
//   formatEmail = req.body.emailid.toLowerCase().trim();
//   console.log("formatted email:" + formatEmail);
  
//   kafka.make_request('loginTopics',{"path":"login", "formatEmail": formatEmail, "body": req.body}, function(err,result){
//     if (err) {
//       res.status(500).json({ responseMessage: 'Database not responding' });
//     }
//     else if (result.status === 200)
//     {
//       console.log("result:", result);
//       // Create token if the password matched and no error was thrown
//       var token = jwt.sign({ id: result.user._id, email: result.user.emailid }, "CMPE273", {
//         expiresIn: 7200 // expires in 2 hours
//       });
//       req.session.user = result.user.emailid;
//       res.status(200).json({ validUser: true, token: token, cookies: {cookie2: result.user._id, cookie3: result.user.name, cookie4: result.user.emailid  }  });
//       console.log("User found in DB and token is", token);

//     } else if (result.status === 400){
//       res.status(200).json({ validUser: false });
//       console.log("Authentication failed. User does not exist.");
//     }
//   })
  
    
// })
module.exports=app;
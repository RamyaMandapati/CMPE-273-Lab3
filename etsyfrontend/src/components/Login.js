import React, { useEffect, useState } from 'react';
import "../css/Login.css";
import Register from "./Register"
import Home from "./Home"
import { Link } from "react-router-dom";
import Axios  from 'axios';
import { useStateValue } from '../StateProvider';
import { red } from '@material-ui/core/colors';
import {useNavigate} from 'react-router'
import { useDispatch } from "react-redux";
import { login, activeUser, activeShop } from "../features/userSlice";
import {rooturl} from '../config/settings';
import {useQuery,gql,useLazyQuery} from "@apollo/client";
import {LOGIN} from '../queries';
function Login() {
    let navigate=useNavigate();
    const url= 'http://'+rooturl+':4000'
    const [emailid,setEmailid] = useState(" ");
    const [password,setPassword] = useState(" ");
    const [loginStatus,setLoginStatus] = useState(" ");
    const dispatch=useDispatch();
    Axios.defaults.withCredentials=true;
    
    const [getUser,{data,error}]=useLazyQuery(LOGIN);

   
    const login_api=()=>{
        console.log(emailid);
        console.log(password);
      getUser({
            variables:{
              
                emailid,
                password,
            }
        })
              if(error){
                navigate('/Login')
            
            }else if(data){
                console.log(data);
                dispatch(
                    login({
                        id: data.login[0]._id,
                        email: data.login[0].emailid,
                        name: data.login[0].name,
                        shopName: data.login[0].shopname,
                        gender: data.login[0].gender,
                        country: data.login[0].country,
                        dob:data.login[0].dob,
                        about:data.login[0].about,
                        shopImage:data.login[0].shopImage,
                        profilepicture:data.login[0].profileimage,
                        phone:data.login[0].phone,
                        address:data.login[0].address,
                        loggedIn: true,
                    })
                  );
                
                
                navigate('/Home')
            }
        
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
   
  return (
    <div className='login'>
        <div className='login_container'>
        
        <h1 className='signin_header'>Sign in</h1>
        <span style={{color : red}}>{loginStatus}</span>
        <form onSubmit={handleSubmit}>
            <h5 className='email_label'>E-mail</h5>
            <input className="email_text" type="text" onChange={(e) =>
             { setEmailid(e.target.value)
            }}/>
            <h5 className='password_label'>Password</h5>
            <input className="password_text" type="password" onChange={(e) =>
             { setPassword(e.target.value)
            }}></input>
            
            <div className='button'>
           
           
            <button type="submit" className='signin_button' onClick={login_api}>Sign in</button>
            
            <p className='or'>or</p>
            <Link to="/Register">
                <button type="submit" className='register_button' >Register</button>
            </Link>
            </div>
        </form>
        
        </div>
        
    </div>
  )
}

export default Login
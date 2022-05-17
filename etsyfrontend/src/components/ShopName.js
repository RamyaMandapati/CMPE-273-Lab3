
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import Navigationbar from './Navigationbar'
import ShopHome from './ShopHome'
import  Axios  from 'axios'
import { useDispatch } from "react-redux";
import {activeShop,selectUser, updateUser} from "../features/userSlice"
import { useSelector } from 'react-redux'
import {rooturl} from '../config/settings';
import {SHOPNAME} from '../queries';
import { useLazyQuery,useMutation } from '@apollo/client';
import {ADDSHOP} from '../mutations'
function ShopName() {
    let navigate=useNavigate();
    const dispatch=useDispatch();
    const user=useSelector(selectUser);
    const [shopname,setshopname] =useState("");
    const [shopNameStatus,setShopNameStatus]=useState("")
    const [message,setMessage]=useState("")
    const url= 'http://'+rooturl+':4000'

    const[getshopname,{data,error}]=useLazyQuery(SHOPNAME);
    const [addShop,{data:shopData,error1}]=useMutation(ADDSHOP);
    const handleShopName = ()=>{
        getshopname({
            variables:{
              
                shopname
            }
        })
        if (error){
            console.log(error);
        }else if(data){
            console.log(data);
            if(data.shopName){
                setShopNameStatus("Available");

            }else{
                setShopNameStatus("Not Avaiable")
            }
        }
      
        

    }
    
    const redirectHandler=()=>{
        
        if(shopNameStatus=="Available"){
            
            addShop({
                variables:{
                    shopname,
                    addShopId:user.id
                }
            })
            console.log(shopData);
            if(shopData){
                dispatch(activeShop({shopName:shopname}));
                navigate("/ShopHome")
            }
            else{
                setMessage("Try another shop name")
            }
            
            
            
        }
        else if(error1){
            setMessage("Try another shop name")
        }
    }
  return (
    <div>
        <Navigationbar/>
        <div style={{textAlign:"center",marginTop:"50px"}}>
            <h1 style={{color:"rgb(238, 101, 43)"}}>Name your shop</h1>
            <h3 style={{color:"rgb(238, 101, 43)"}}>Choose a memorable name that reflects your style</h3>
            <div>
                <input type="text" className="checkshopname" 
                style={{width:"400px",
                        height:"40px",
                        marginTop:"30px",
                        borderRadius:"20px"
                        }}
                onChange={(e) =>
                { setshopname(e.target.value)}}/>
                <span style={{color:"rgb(238, 101, 43)"}}>{shopNameStatus}</span>
                <button type="submit" className="checkavailability" 
                style={{color:"rgb(238, 101, 43)", borderRadius:"10px",marginLeft:"20px"}}
                onClick={handleShopName}>CheckAvailability</button>
                <br/>
                <button type="submit" className="redirect" 
                style={{color:"rgb(238, 101, 43)", borderRadius:"10px",marginTop:"20px", width:"150px"}}
                onClick={redirectHandler}>Confirm</button>
                <p>{message}</p>
            </div>
        </div>
    </div>
  )
}

export default ShopName
import React from 'react'
import profilepicture from "../uploads/profilepicture.png"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { getCartItems } from '../features/cartItemsSlice';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import Navigationbar from './Navigationbar';
import { Link } from 'react-router-dom';
import "../css/Cart.css"
import {rooturl} from '../config/settings';
import Pagination from './Pagination';

import {useQuery,gql,useLazyQuery} from "@apollo/client";
import {ORDERS} from "../queries";

function Orders() {
    const navigate=useNavigate();
    const url= 'http://'+rooturl+':4000'
    const user=useSelector(selectUser);
    const ouser_id=user.id;
    
    const [products, setProducts] = useState([]);
  
  //const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
   
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  

  useEffect(()=>{

  },[])
  const {error, loading, data}= useQuery(ORDERS, {
    variables:  {ouser_id},
      });
    
  
    
    if(loading){
      return<p>loading</p>

    }
    //setProducts(data.orders);
      console.log(data);
   
    
      const renderCards = (data.orders).map((product) => {
          console.log(product.oproduct_id.id);
        return (
    
            <div className="cartitem">
                
            <div className="cartitem__image">
              
                 
                  <img style={{width:"200px",height:"158px"}} src={product.oproduct_id.image} alt="" />
                </div>
          <Link to={`/ItemOverview/${product.oproduct_id.id}`} className="cartItem__name">
            <p>{product.oproduct_id.productname}</p>
          </Link>
          <p className="cartitem__price">${product.oproduct_id.price}</p>
          <p className='quantity'>{product.oquantity}</p>
          <p className='ordered_date'>{product.odate}</p>
          <br>
          </br>
          <p>{product.checked}</p>
          
          
        </div>
      );
      });
    
      //const paginate = (pageNumber) => setCurrentPage(pageNumber);
      return (
        <div>
          
          <Navigationbar/>
          <hr></hr>
          <div className="purchases_header">
        <h2 style={{ marginLeft: "110px" }}>Your Orders</h2>
        
      </div>
            
           

            <div style={{backgroundColor:"rgb(243, 234, 223)"}}>
              <div style={{ width: "75%", margin: "3rem auto" }}>
                <div style={{ textAlign: "center" }}></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem auto",
                  }}
                ></div>
                {data.orders.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      height: "300px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h2>No post yet...</h2>
                  </div>
                ) : (
                 
                  <div className="container-fluid mx-1">
                    <div className="row mt-5 mx-1">
                      <div className="col-md-15">
                        <div className="row">{renderCards}</div>
                        {/* <Pagination
                          itemsPerPage={itemsPerPage}
                          totalItems={products.length}
                          paginate={paginate}
                        /> */}
                      </div>
                    </div>
                    
                  </div>
                 
                )}
    
                <br />
                <br />
                
             </div>
             
            </div>
        </div>
  )
}

export default Orders
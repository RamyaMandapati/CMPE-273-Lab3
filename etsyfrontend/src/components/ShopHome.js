
import React, { useState, useEffect } from "react";
import profilepicture from "../uploads/profilepicture.png"
import EditProduct from "./EditProduct"
import "../App.css"
import Popup from "./Popup";
import Axios from "axios";
import { Col, Card, Row } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router';
import Navigationbar from "./Navigationbar";
import {rooturl} from '../config/settings';
import {getProducts} from '../queries'
import { useQuery } from "@apollo/client";

import userSlice, { selectUser, selectShop } from "../features/userSlice";
import { orange } from "@material-ui/core/colors";
function ShopHome() {

  const navigate=useNavigate();
  const user = useSelector(selectUser);
  const shop= useSelector(selectShop);
  const user_id=user.id;
  const url= 'http://'+rooturl+':4000'
  const [products, setProducts] = useState([]);
  const [showProds, setShowProds] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [showProductsAddPage, setShowProductsAddPage] = useState(false);
  const [editProductPage, setEditProductPage] = useState(false);
  const [postSize, setPostSize] = useState();
  const [shopimage,setShopImage]=useState([]);



const {error, loading, data}= useQuery(getProducts, {
  variables:  {productsofshopId:user_id},
    });
  

  
  if(loading){
    return<p>loading</p>

  }

    console.log(data);
  const addItems = () => {
    setShowProductsAddPage(true);
  };

  

const renderCards = data.productsofshop.map((product) => {
    return (
      <div className="col-md-4 mb-4">
        <div className="card" style={{height:"300px",width:"300px"}}>
          
             
              <img style={{width:"200px",height:"158px"}} src={product.image} alt="" />
              <div className="card-body">
                <h5 className="card-title">{product.productname}</h5>
                <p>Price: ${product.price}</p>
                <Link to={`EditProduct/${product._id}`} className="btn btn-success btn-sm" style={{borderRadius:"10px"}}>edit product</Link>
                <Link to={`EditImage/${product._id}`} className="btn btn-success btn-sm" style={{borderRadius:"10px"}}>edit image</Link>
            </div>
          </div>
        </div>

          
          
        
          
    );
  });

  return (
    <div>
      
      <Navigationbar/>
      <hr></hr>
      <div className="shophome_header">
        <div className="shop_details">
          
          <img
            className="shop_img"
             src={user.shopImage} alt={profilepicture}
          ></img>
          <div className="shop_info">
            <h3 className="shop_name">Puma</h3>
            <p>0 sales </p>
            <div className="htmlForm-group">
            <Link to={`EditShopImage/${user_id}`} className="btn btn-success btn-sm" style={{borderRadius:"10px"}}>edit shop image</Link>
            
            
            </div>
          </div>
        </div>
        <div className="owner_details">
          <h6 style={{ fontSize: "18px" }}>SHOP OWNER</h6>
          <img
            style={{ width: "30%", borderRadius: "50%", height: "100px" }}
            src={user.profilepicture}
          ></img>
          
          <h5>{user.name}</h5>
        </div>
      </div>
      <div className="shop_items" style={{backgroundColor:"rgb(243, 234, 223)"}}>
        <div>
          <button
            style={{
              marginLeft: "7.5%",
              padding: "10px",
              width: "25%",
              backgroundColor: "hsl(18, 85%, 55%)",
              border: "none",
              color: "white",
              borderRadius:"20px"
            }}
            onClick={addItems}
          >
            Add Item
          </button>
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
            {data.productsofshop.length === 0 ? (
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
                  </div>
                </div>
              </div>
             
            )}

            <br />
            <br />
           
          </div>
        </div>
      </div>

      {showProductsAddPage && (
        <Popup setShowProductsAddPage={setShowProductsAddPage} />
      )}
      
    </div>
  );
}

export default ShopHome;
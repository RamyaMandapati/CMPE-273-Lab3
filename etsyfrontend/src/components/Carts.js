import React from 'react'
import profilepicture from "../uploads/profilepicture.png"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser} from '../features/userSlice';
import { getCartItems ,createFinalCart,getFinalCart,removeCartItem,updateCartItem, createCartItem,removecartProductsState} from '../features/cartItemsSlice';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import Navigationbar from './Navigationbar';
import { Link } from 'react-router-dom';
import "../css/Cart.css"
import { useDispatch } from 'react-redux';
import {rooturl} from '../config/settings';
import {getCart} from "../queries"
import { useQuery } from '@apollo/client';
function Carts() {
    const navigate=useNavigate();
    const user=useSelector(selectUser);
    //const products=useSelector(getCartItems);
    const userid=user.id;
    const [quantity,setQuantity]=useState(0)
    const dispatch=useDispatch();
    const finalCartProducts = useSelector(getCartItems);
    const url= 'http://'+rooturl+':5000'
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState(false);
    const [message,setMessage]=useState("")

    useEffect(() => {
    
   
    
    
  }, []);
  const {loading,data,error}=useQuery(getCart,{
    variables:{
      cuserId:userid
    }
  });
  if(loading){
    return <div>loaoading..!</div>
  }
  if(data){
  console.log(data);
  }
  const getQtyFromCart = (productid) => {
    
    Axios.get(`${url}/getQty/${userid}/${productid}`).then(
      (response) => {
        
        if (response.data.success) {
          console.log(response);
          var qty= response.data.result[0].quantity;
         return qty;
        } else {
          console.log("Failed in ");
        }
      }
    );
  };

  const qtyChangeHandler = (productcart, quantityupdate) => {
    console.log(productcart)
    dispatch(
      createFinalCart({
        itemId: productcart.cproduct_id._id,
        itemName: productcart.cproduct_id.productname,
        itemDescription: productcart.cproduct_id.description,
        itemImage: productcart.cproduct_id.image,
        itemPrice: productcart.cproduct_id.price,
        itemCount: productcart.cproduct_id.count,
        // itemId: item.itemId,
        qty: Number(quantityupdate),
        subtotal:Number(productcart.cproduct_id.price)*Number(quantityupdate)
      })
     
    );
    Axios.put(`${url}/updateCartQuantity/${userid}` , {
      itemId: productcart.cproduct_id._id,
      qty: quantityupdate,
    }).then((response) => {
      if (response.data.success === true) {
        console.log("Cart quantity updated");
      }
    });
    window.location.reload(true);
  };
  const removeHandler=(id)=>{
    Axios.post(`${url}/delCart/${userid}/${id}`).then(
      (response) => {
        
        if (response.data.success) {
          console.log(response);
          var qty= response.data.result[0].quantity;
         return qty;
        } else {
          console.log("Failed in ");
        }
      }
    );
 
    dispatch(removeCartItem(id));

    
  }
  
  
  
 

  const renderCards = data.getCart.map((product) => {
    
 
      
    return (

        <div className="cartitem">
            
        <div className="cartitem__image">
          
             
              <img style={{width:"200px",height:"158px"}} src={product.cproduct_id.image} alt="" />
            </div>  
      <Link to={`/ItemOverview/${product.cproduct_id._id}`} className="cartItem__name">
        <p>{product.cproduct_id.productname}</p>
      </Link>
      <p className="cartitem__price">${product.cproduct_id.price}</p>
      
      <select
        defaultValue={product.quantity}

        onChange={(e) => qtyChangeHandler(product, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(Number(product.cproduct_id.count)).keys()].map((x) => (
          <option key={x +1} value={x+1}>
            {x +1}
          </option>
        ))}
      </select>
      <DeleteIcon
        
        onClick={() => removeHandler(product.cproduct_id._id)}
      >
        
      </DeleteIcon>
      <div style={{alignItems:"right"}}>
        <input
          type="checkbox"
        
          id="count"
          name="count"
          value="count"
          //style={{float:"right"}}
          onChange={(e)=>setChecked(e.target.checked)}
      />
      <label htmlor="count">Add gift wrapping</label>
      {checked==true && (
      <div className="htmlForm-group">
              <label htmlFor="item_category">Add message</label>
              <br />
              <input
                type="text"
                className="item_category"
                id="item_category"
                placeholder="Item Category"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                required
              />
            </div>

      )}
      </div>
      <br></br>
    </div>
  );
  });
  const OrderHandler=()=>{
   
 
    products.map((product) =>{
      Axios.post(`${url}/editCount/${product.cproduct_id._id}`,{quantity:product.quantity})
      .then((response)=>{
        console.log(response);
      }).catch((err)=>{
        console.log(err);
      })
    })
    products.map((product)=>{
      Axios.post(`${url}/updateOrders/${userid}`,{itemId:product.cproduct_id._id,subtotal:getCartSubTotal(),quantity:product.quantity,giftmessage:message})
      .then((response)=>{
        console.log(response);

      })
    });
    Axios.post(`${url}/deletefullCart/${userid}`)
    .then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })
    dispatch(removecartProductsState());
    //navigate("/Orders")
  }
  const getCartSubTotal=()=>{
    

    
    return finalCartProducts
    .reduce((price, item) => price + item.subtotal, 0)
    .toFixed(2);
  }

   
  return (
    <div>
      
      <Navigationbar/>
      <hr></hr>
      
        <h2>Shopping Cart</h2>
       
     
        <div style={{backgroundColor:"rgb(243, 234, 223)"}}>
          <div style={{ width: "50%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}></div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "1rem auto",
              }}
            ></div>
            {data.getCart.length === 0 ? (
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
             
              <div className="container-fluid mx-1" >
                <div className="row mt-5 mx-1">
                  <div className="col-md-15">
                    <div style={{float:'left',marginLeft:"-10px"}}>{renderCards}</div>
                  </div>
                   <div>
                     <p>Total: ${getCartSubTotal()}</p>
                   </div> 
                   <button style={{width:"200px",borderRadius:"20px",color:"white",backgroundColor:"black"}} onClick={OrderHandler}>Proceed to checkout</button>
                </div>
              </div>
             
            )}

            <br />
            <br />
            
         </div>
        </div>
    </div>
  );
}
export default Carts
import React, { useState } from 'react'
import profilepicture from "../uploads/profilepicture.png"
import { useSelector } from 'react-redux';
import { selectUser,selectShop } from '../features/userSlice';
import Axios  from 'axios';
import Navigationbar from "./Navigationbar"
import { useNavigate } from 'react-router-dom';
import { fontSize } from '@mui/system';
import {login,delProfile} from "../features/userSlice"
import { useDispatch } from 'react-redux';
import {rooturl} from '../config/settings';
function Profile() {
    const user=useSelector(selectUser);
    const url= 'http://'+rooturl+':5000'
     const [userid,setId]=useState(user.id)
     const [emailid,setEmail]=useState(user.email)
     const [shop,setShop]=useState(user.shopName)
     const [image,setImage]=useState(user.profilepicture)
    const [userImage,setUserImage]=useState(user.profilepicture);
    const [shopImage,setShopimage]=useState(user.shopImage)
    const [userName,setUserName]=useState(user.name);
   const navigate=useNavigate();
    const [gender,setGender]=useState(user.gender);
    const [country,setCountry]=useState(user.country);
    const [dob,setDob]=useState(user.dob);
    const [about,setAbout]=useState(user.about);
    const [phonenumber,setPhone]=useState(user.phone);
    const [address,setAddress]=useState(user.address) 
    const dispatch=useDispatch();   
    const handleUserData=async()=>
    {
        //e.preventDefault();
        
        var formData = new FormData();
        
        formData.append("userImage", userImage);
        
        formData.append("userName", userName);
        formData.append("gender", gender);
        console.log(gender);
        formData.append("country", country);
        formData.append("dob", dob);
        formData.append("about", about);
        formData.append("id",user.id);
        formData.append("address",user.address)
        formData.append("phonenumber",phonenumber)
        console.log("gender"+formData.get("country"));
        console.log("name"+formData.get("userName"));

        Axios.post(`${url}/profile`, formData, {
          headers: { "content-Type": "multipart/form-data" },
        }).then((res)=>{
              console.log(res);
          }).catch((err)=>{
              console.log(err);
          })
          // navigate("/Home");

    }
  return (
    < div>
      <Navigationbar/>

      <div className='form' > 
          <h4>Your Public Profile</h4>
          <p>Everything on this page can be seen by anyone</p>
          <form>
              
      

      <input
        type="file"
        name="userImage"
        id="profile-picture"
        
        style={{fontSize:"10px", alignSelf:"center",textcolor:" hsl(18, 85%, 55%)"}}
        onChange={(event) => {
          setUserImage(event.target.files[0]);
        }}
      />
      <div className="profile-pic">
        
        <img 
        src={profilepicture} 
        height={158} width={158} style={{borderRadius:"45px"}}/>
      </div>

    <div className="section">
      <label className='name'>Your name :</label>
      <input
        style={{margin:"10px",}}
        defaultValue={user.name}
        onChange={(event) => {
          setUserName(event.target.value);
        }}
        type="text"
        id="country"
      />
    </div>
    <div className="section">
      <label className='name'>Your phone :</label>
      <input
        style={{margin:"10px",}}
        defaultValue={user.phone}
        onChange={(event) => {
          setPhone(event.target.value);
        }}
        type="text"
        id="phone"
      />
    </div>
    <div className="section">
                <div className="label">Birthday</div>
                <input
                  defaultValue={user.dob}
                  type="date"
                  style={{ marginLeft: "-2%" }}
                  onChange={(event) => {
                    setDob(event.target.value);
                  }}
                />
              </div>


    <div className="section">
      

      <div
        style={{
          display: "flex",
          justifyContent:"center",
          margin:"10px"
        }}
        className="gender"
      >
        <label style={{marginRight:"50px"}}>Gender :</label>
        <div>
          <input
            type="radio"
            value="female"
            defaultValue={user.gender}
            name="gender"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
          <label htmlFor="female" style={{
         
          marginRight:"10px"
        }}>Female</label>
        </div>
        <div>
          <input
            defaultValue={user.gender}
            type="radio"
            value="male"
            name="gender"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
          <label style={{
         
         marginRight:"10px"
       }}htmlFor="male">Male</label>
        </div>
        <div>
          <input
            defaultValue={user.gender}
            type="radio"
            value="Other"
            name="gender"
            onChange={(event) => {
              setGender(event.target.value);

            }}
          />
          <label style={{
         
         marginRight:"10px"
       }}htmlFor="other">Other</label>
          
        </div>
      </div>
    </div>


    <div className="section">
      <label style={{margin:"10px",marginRight:"50px"}}>City  :</label>
      <input
        style={{margin:"10px",}}
        defaultValue={user.country}
        onChange={(event) => {
          setCountry(event.target.value);
        }}
        type="text"
        id="name"
      />
    </div>
   

    <div>

    <div className="section">
      <div>Address :</div>
        
        
      </div>
      <textarea
        defaultValue={user.address}
        style={{
          marginLeft: "-3%",
          borderRadius: "4px",
          padding: "10px",
          border: "1px solid #dcdcdc",
          height:"100px"
        }}
        id="about"
        cols="30"
        rows="10"
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      ></textarea>
      </div>
     <div>

    <div className="section">
      <div>About (Tell people a little about yourself) :</div>
        
        
      </div>
      <textarea
        defaultValue={user.about}
        style={{
          marginLeft: "-3%",
          borderRadius: "4px",
          padding: "10px",
          border: "1px solid #dcdcdc",
          height:"100px"
        }}
        id="about"
        cols="30"
        rows="10"
        onChange={(event) => {
          setAbout(event.target.value);
        }}
      ></textarea>
      </div>
    
     <div>
    <button type="button" className="profile-click" onClick={handleUserData} style={{margin:"10px",borderRadius:"10px"}}>
      Save Changes
    </button></div>  
  </form>
</div>
</div>
  )
}

export default Profile
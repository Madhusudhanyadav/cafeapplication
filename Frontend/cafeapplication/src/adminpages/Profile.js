import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import toast from '../components/toast';
import "../styles/AdminHome.css";

export default function Profile(props) {
  // const navigate = useNavigate();
  const [admin,setAdmin]=useState({});
  const [newadmin,setNewAdmin]=useState({});
  const [pass,setNewPass]=useState({});
  const config = {
    headers : {Authorization : 'Bearer '+localStorage.getItem("token")}
  }
  props.clearInt();
  useEffect(()=>{
    const url="http://localhost:8080/admin/get/info?email="+localStorage.getItem("isLogged");

    // console.log(config);
    axios.get(url,config).then((response)=>{

      // console.log(response.data);
      setAdmin(response.data);
      // console.log(admin);
      setNewAdmin(response.data);
    })
  },[])

  const handleOnChange=(event)=>{
    event.preventDefault();
    const tp=newadmin;
    const tp2=pass;
    if(event.target.name === "name"){
      
      tp["name"]=event.target.value;
     
      // console.log(admin);   
    }
    // else if(event.target.name === "email" ){
    //   tp["email"]=event.target.value;
    // }
    else if(event.target.name === "new_pass"){
      // setNewPass(event.target.value);
      tp2["newpass"]=event.target.value;
    }
    setNewAdmin(tp);
    setNewPass(tp2);
    // console.log(admin,tp2);
    
  }

  
 // Submit
  const handleOnSubmit = (event)=>{
    if((pass['newpass'] === undefined && newadmin['name'] === undefined )||( pass['newpass'] === '' && newadmin['name'] === '')){
      toast("Enter fields");
      return ;
    }
    
    
    const tp=admin;
    // const tp2=newadmin;
    if(pass["newpass"]!==""){
      // if(tp2["oldpass"] === admin["pwd"]){
        tp["pwd"]=pass["newpass"];
      // }
    }
    else if(newadmin["name"]!==""){
      
      tp["name"]=newadmin["name"];
      
    }
    console.log(tp);
    setAdmin(tp);
    console.log(admin);
    update();
  }

 // UPDATE
 const update = () =>{
  axios.post("http://localhost:8080/admin/update/info",admin,config).then((response)=>{
    if(response.status === 200){
      toast("successfully updated");
      // console.log(document.getElementsByName("name"));
      

    }
  })
 }


  // Toast messages
  


  return (
    <div className='mycont container'>
      <h2>Update Info</h2>
      <div className='d-flex justify-content-start py-3'>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">OLD Name </span>
          <h6 className='m-2' >{admin.name}</h6>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">New Name</span>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name='name'  onChange={handleOnChange}/>
        </div>
      </div>
      <div className='d-flex justify-content-start py-3'>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">Email </span>
          <h6 className='m-2'>{admin.email}</h6>
        </div>
        
      </div>
      <div className='d-flex justify-content-start py-3'>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">New Password</span>
          <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name='new_pass' onChange={handleOnChange}/>
        </div>
      </div>
      <div className="d-flex justify-content-center p-3"><button type="button" className="btn btn-success" onClick={handleOnSubmit}>Update</button></div>
      {/* </form> */}
    </div>
    
  )
}

import React, { useState } from 'react'
import Style from './Login.module.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Joi from 'joi'
import Helmet from 'react-helmet'

export default function Login({saveUserData}) {
  let navigate = useNavigate()
  
  const [erorr, seterorr] = useState("")
  const [erorrDataFromValidate, seterorrDataFromValidate] = useState([])
  
  const[isloading,setisloading]=useState(false)
  const [User, setUser] = useState(
    {
      email:"",
      password:''
    })

  
  function getData(e) {
    let myUser = { ...User }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }


 async function sendDataToApi() {
   let { data } = await axios.post("https://movies-api.routemisr.com/signin", User)
   if (data.message === "success") {
    localStorage.setItem("token", data.token)
    saveUserData() 
    setisloading(false)
    navigate("/")
     
   }
   else {
     seterorr(data.message)
     setisloading(false)
   }
  }
  




  





  function ValidationData() {
  let schema=Joi.object(
    {
      email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      password:Joi.string().pattern(/^[A-Z][1-9]{1,9}$/)
    }
    

  )
  return schema.validate(User,{abortEarly:false})
}
  

  function submitData(e) {
    setisloading(true)
    e.preventDefault();
    let validation = ValidationData();
    if (validation.error) {
      setisloading(false)
      seterorrDataFromValidate(validation.error.details)
    }
    else {
      
      sendDataToApi()
    }

  }

  
  
  
  
  
  
  return <>
    



    <Helmet>
      <meta name="description" content="Web site For movies" />
      <title>Login</title>

    </Helmet>
    <div className="container">
       <form onSubmit={submitData}>
      <h2 className='text-center my-5'><span className={`${Style.L}`}>L</span>ogin</h2>
      {erorr.length > 0 ? <div className='alert alert-danger'>{ erorr}</div>:""}
      <label htmlFor="email">Email</label>
      <input onChange={getData} type="email" className='form-control my-2' id='email' name='email' />
      {erorrDataFromValidate.filter((err) =>
        err.context.label === "email")[0] ? <div className='alert alert-danger'>
        {erorrDataFromValidate.filter((err) =>
          err.context.label === "email")[0]?.message}
      </div>:""
    
      }
      <label htmlFor="password">Password</label>
      <input onChange={getData} type="password" className='form-control my-2' id='password' name='password' />
      {erorrDataFromValidate.filter((err) =>
        err.context.label === "password")[0] ? <div className='alert alert-danger'>
        {erorrDataFromValidate.filter((err) =>
          err.context.label === "password")[0]?.message}
      </div> : ""

      }
      <button className={`${Style.sendForLogin} float-end my-2`}>{ isloading?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>
      <div className="clearfix"></div>
    </form>
  </div>
   
  
  </>
}

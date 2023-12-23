import React, { useState } from 'react'
import Style from './Register.module.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Helmet from 'react-helmet'
import Joi from 'joi'





export default function Register() {
  
  let navigate = useNavigate();
  const [erorr, seterorr] = useState('')// erorr from Api
  const [isloading, setisloading] = useState(false)
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password:""
  })

  const [erorrValidate,seterorrValidat]=useState([])//error from validate

  function getData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setuser(myUser)
  }


  async function sendDataToAPi() {
    let { data } = await axios.post("https://movies-api.routemisr.com/signup", user)
    if (data.message==="success") {
      setisloading(false)
      navigate('/login')
    }
    else {
      seterorr(data.message)
      setisloading(false)

    }
  }
  
  
  
    function validateForm() {
    let schema=  Joi.object({
        first_name: Joi.string().min(3).max(10).required(),
        last_name: Joi.string().min(3).max(10).required(),
        age: Joi.number().min(16).max(50).required(),
        email: Joi.string().email({tlds:{allow:["com","net"]}}).required(),
        password:Joi.string().pattern(/^[A-Z][1-9]{0,9}$/)
        
    })
    return schema.validate(user,{abortEarly:false})

  }
  


  function submitData(e) {
    setisloading(true)
    e.preventDefault();
   let validationForInputs= validateForm();
    if (validationForInputs.error) {
      setisloading(false)
      seterorrValidat(validationForInputs.error.details)

    }
    else {
      sendDataToAPi()

    }
  }


  return <>

    <Helmet>
      <meta name="description" content="Web site For movies" />
      <title>Register</title>

    </Helmet>



    <div className="container">
      <form onSubmit={submitData}>
      <h2 className='text-center my-3'><span className={Style.R}>R</span>
        egister</h2>
      {erorr.length > 0 ? <div className='alert alert-danger'>{erorr}</div> : ""}
      
      <label htmlFor="first_name">First Name</label>
      <input onChange={getData} type="text" className=' form-control my-2 ' name='first_name' id='first_name' />
      {erorrValidate.filter((err) =>
        err.context.label === "first_name")[0] ?<div className='alert alert-danger'>
      {erorrValidate.filter((err) => 
      err.context.label==="first_name")[0]?.message}
      </div>:""}
      
      <label htmlFor="last_name">Last Name</label>
      <input onChange={getData} type="text" className=' form-control my-2 ' name='last_name' id='last_name' />
      {erorrValidate.filter((err) =>
        err.context.label === "last_name")[0] ?<div className='alert alert-danger'>
      {erorrValidate.filter((err) => 
      err.context.label==="last_name")[0]?.message}
      </div>:""}
      <label htmlFor="age">Age</label>
      <input onChange={getData} type="number" className=' form-control my-2 ' name='age' id='age' />
      {erorrValidate.filter((err) =>
        err.context.label === "age")[0] ? <div className='alert alert-danger'>
        {erorrValidate.filter((err) =>
          err.context.label === "age")[0]?.message}
      </div> : ""}
      {erorrValidate === "age" ? <div className='alert alert-danger my-2'>{ erorrValidate}</div>:""}
      <label htmlFor="email">Email</label>
      <input onChange={getData} type="email" className=' form-control my-2 ' name='email' id='email' />
      {erorrValidate.filter((err) =>
        err.context.label === "email")[0] ? <div className='alert alert-danger'>
        {erorrValidate.filter((err) =>
          err.context.label === "email")[0]?.message}
      </div> : ""}
      <label htmlFor="password">Password</label>
      <input onChange={getData} type="password" className=' form-control my-2 ' name='password' id='password' />
      {erorrValidate.filter((err) =>
        err.context.label === "password")[0] ? <div className='alert alert-danger'>
        {erorrValidate.filter((err) =>
          err.context.label === "password")[0]?.message}
      </div> : ""}
      <button className={`${Style.send}  float-end my-3 `}>{ isloading?<i className='fas fa-spinner fa-spin'></i>:"Register"}</button>
      
      <div className='clearfix'></div>
  </form>
    </div>
    
  </>
}

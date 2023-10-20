import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
    const [userData,setUserData] = useState({name:"",email:"",password:"",confirmPassword:""})
    const router = useNavigate
    // const {state} = useContext(AuthContext)

    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
    }
    console.log(userData,"userData")

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(userData.name && userData.password && userData.email && userData.confirmPassword ){
            if(userData.password === userData.confirmPassword){
               const  response = await axios.post("http://localhost:8000/register",userData) 
               if(response.data.success){
                 setUserData({name:"",email:"",password:"",confirmPassword:""})
                 router("/login")
                 toast.success(response.data.message)
               }else{
                toast.error(response.data.message)
               }
            }else{
                toast.error("Password and confirm password not match")
            }
        }else{
            toast.error("All Fields are Mandtory")
        }
    }
    // console.log(userData,"userData")
    // useEffect(()=>{
    //     if(state?.user?.name){
    //         router("/")
    //     }
    // })
  return (
    <div className='border'>
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>Name</label><br/>
            <input type='text'onChange={handleChange} name="name" value={userData.name}/><br/>
            <label>Email</label><br/>
            <input type='email' onChange={handleChange} name="email" value={userData.email}/><br/>
            <label>Password</label><br/>
            <input type='password' onChange={handleChange} name="password" value={userData.password}/><br/>
            <label>Confirm Password</label><br/>
            <input type='Password' onChange={handleChange} name="confirmPassword" value={userData.confirmPassword}/><br/>
         <input type='submit'/>
          <p>Allready Have Acount Click Here?</p>
        </form>
        
        </div>
  )
}

export default Register
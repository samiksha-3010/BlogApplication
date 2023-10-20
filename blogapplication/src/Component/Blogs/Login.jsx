import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [ userData,setUserData] = useState({email:"",password:""})
    const router = useNavigate()
   const   handleChange  = (event) =>{
    setUserData({...userData,[event.target.name]:event.target.value})
   }
   console.log(userData,"setuserData")

   const handleSubmit = async(event) =>{
    event.preventDefault();
    if(userData.email && userData.password){
             const response = await axios.post("http://localhost:8000/login", { userData });
             if(response.data.success){
                dispatchEvent({ type:"LOGIN",payload:response.data.user})
                localStorage.setItem("token",JSON.stringify(response.data.token))
                setUserData({email:"",password:""})
                router("/")
                toast.success(response.data.message)
             }else{
                toast.error(response.data.message)
             }
        }else{
            toast.error("All Fields Are Mantory")
        }
   }
   console.log(userData,"userData")

//    useEffect(()=>{
//     if(state?.user?.name){
//         router("/")
//     }
//    })
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Email</label><br/>
            <input type='email' name="email" onChange={handleChange}/><br/>
            <label>Password</label><br/>
            <input  type="password" name='password'onChange={handleChange}/><br/>
            <input type='submit'/>
            <p>New Register Here?</p>
        </form>
    </div>
  )
}

export default Login
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const [ userData,setUserData] = useState({email:"",password:""})
    const router = useNavigate();
   const   handleChange  = (event) =>{
    setUserData({...userData,[event.target.name]:event.target.value})
   }
  //  console.log(userData,"setuserData")

   const handleSubmit = async(event) =>{
    event.preventDefault();
    if(userData.email && userData.password){
             const response = await axios.post("http://localhost:8000/login",{ userData });
             if(response.data.success){
                // dispatchEvent({ type:"LOGIN",payload:response.data.user})
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
    <div  style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} >
        <form onSubmit={handleSubmit}  >
          <fieldset  style={{
            width: "380px",
            marginTop: "50px",
            textAlign: "centre",
            backgroundColor: '#9d6e41'
          }} >
            <label>Email</label><br/>
            <input style={{
              width: "380px",
              marginTop: "10px",
              height: "30px",
              marginBottom: "10px",
              textAlign: "centre",
            }} type='email' name="email" onChange={handleChange}/><br/>
            <label>Password</label><br/>
            <input  style={{
              width: "380px",
              marginTop: "10px",
              height: "30px",
              marginBottom: "10px",
              textAlign: "centre",
            }} type="password" name='password'onChange={handleChange}/><br/>
            <input  type='submit' style={{
              marginLeft: "145px",
              marginTop: "15px",
              backgroundColor: " black",
              fontWeight: "700",
              border: "2px solid  black",
              color:"white",
              padding: "8px 35px",
              borderRadius: "20px",
            }}/>
            <br/>
           <u style={{marginLeft:"18%",marginTop:"10%", color:"red"}} onClick={() => router('/register')}>New user? Register</u>
           </fieldset>
        </form>
    </div>
  )
}

export default Login
// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// // import { AuthContext } from '../../Context/AuthContext'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import "./Style/Register.css"

// const Register = () => {
//     const [userData,setUserData] = useState({name:"",email:"",password:"",confirmPassword:""})
//     const router = useNavigate();
//     // const {state} = useContext(AuthContext)

//     const handleChange = (event)=>{
//         setUserData({...userData,[event.target.name]:event.target.value})
//     }
//     console.log(userData,"userData")

//     const handleSubmit = async (event) =>{
//         event.preventDefault();
//         if(userData.name && userData.password && userData.email && userData.confirmPassword ){
//             if(userData.password === userData.confirmPassword){
//                const  response = await axios.post("http://localhost:8000/register",userData) 
//                if(response.data.success){
//                  setUserData({name:"",email:"",password:"",confirmPassword:""})
//                  router("/login")
//                  toast.success(response.data.message)
//                }else{
//                 toast.error(response.data.message)
//                }
//             }else{
//                 toast.error("Password and confirm password not match")
//             }
//         }else{
//             toast.error("All Fields are Mandtory")
//         }
//     }
//     // console.log(userData,"userData")
//     // useEffect(()=>{
//     //     if(state?.user?.name){
//     //         router("/")
//     //     }
//     // })
//   return (
//     <div className='border'>
//         <form onSubmit={handleSubmit}>
//             <fieldset className='fildest'>
//             <h2>Register</h2>
//             <label className='label'>Name</label><br/>
//             <input className='input' type='text'onChange={handleChange} name="name" value={userData.name}/><br/>
//             <label className='label'>Email</label><br/>
//             <input className='input'  type='email' onChange={handleChange} name="email" value={userData.email}/><br/>
//             <label className='label'>Password</label><br/>
//             <input className='input'  type='password' onChange={handleChange} name="password" value={userData.password}/><br/>
//             <label className='label'>Confirm Password</label><br/>
//             <input className='input'  type='Password' onChange={handleChange} name="confirmPassword" value={userData.confirmPassword}/><br/>
//          <input type='submit' className='submit'/>
//           <p  onClick={() => router('/login')} className='newregster' style={{cursor:"pointer"}}>Allready Have Acount Click Here?</p>
//           </fieldset>
//         </form>
        
//         </div>
//   )
// }

// export default Register



import React, { useContext, useEffect, useState } from "react";
import "./Style/Register.css"
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { MyContext } from "../../Context/AuthContext";
import api from "./ApiConfig/Index";

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const route = useNavigate();

  const { state } = useContext(MyContext);

  useEffect(() => {
    if (state?.currentuser?.name) {
      route("/");
    }
  }, [state?.currentuser, route]);

  // console.log(user);

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = user;

    if (name && email && password && role) {
      try {
        const response = await api.post("/register", { user });
        if (response.data.success) {
          toast.success(response.data.message);
          setUser({
            name: "",
            email: "",
            password: "",
            role: "",
          });
          route("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("All Fields are mandatory");
    }
  };

  const toggelEye = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="registerBackground">
        <div className="regContainer">
          <div className="loginRegNavLink">
            <NavLink to="/login">Sign In</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </div>

          <div className="mainOutletContainer">
            <form className="regForm" onSubmit={handleSubmit}>
              <div className="allInputs">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  value={user.name}
                  name="name"
                />
              </div>
              <div className="allInputs">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  value={user.email}
                  name="email"
                />
              </div>
              <div className="allInputs" id="allInputspassword">
                {user?.password && (
                  <div onClick={toggelEye}>
                    {visible ? (
                      <div className="eye">
                        <AiOutlineEyeInvisible />
                      </div>
                    ) : (
                      <div className="eye">
                        <AiOutlineEye />
                      </div>
                    )}
                  </div>
                )}

                <input
                  onChange={handleChange}
                  value={user.password}
                  type={visible ? "text" : "password"}
                  placeholder="Enter Your password"
                  name="password"
                />
              </div>
              <div className="selectOptions">
                <select onChange={handleChange} name="role" value={user.role}>
                  <option>Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <button className="btnSignUp" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
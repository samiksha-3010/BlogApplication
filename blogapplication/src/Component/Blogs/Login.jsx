// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import "./Style/Login.css"




// const Login = () => {
//     const [ userData,setUserData] = useState({email:"",password:""})
//     const router = useNavigate();
//    const   handleChange  = (event) =>{
//     setUserData({...userData,[event.target.name]:event.target.value})
//    }
//   //  console.log(userData,"setuserData")

//    const handleSubmit = async(event) =>{
//     event.preventDefault();
//     if(userData.email && userData.password){
//              const response = await axios.post("http://localhost:8000/login",{ userData });
//              if(response.data.success){
//                 // dispatchEvent({ type:"LOGIN",payload:response.data.user})
//                 localStorage.setItem("token",JSON.stringify(response.data.token))
//                 setUserData({email:"",password:""})
//                 router("/")

//                 toast.success(response.data.message)
//              }else{
//                 toast.error(response.data.message)
//              }
//         }else{
//             toast.error("All Fields Are Mantory")
//         }
//    }
//    console.log(userData,"userData")

// //    useEffect(()=>{
// //     if(state?.user?.name){
// //         router("/")
// //     }
// //    })
//   return (
//     <div  style={{ display: "flex", justifyContent: "center", marginTop: "50px" }} >
//         <form onSubmit={handleSubmit}  >
//           <fieldset  style={{
//             width: "380px",
//             marginTop: "50px",
//             textAlign: "centre",
//             backgroundColor: '#9d6e41'
//           }} >
//             <label>Email</label><br/>
//             <input style={{
//               width: "380px",
//               marginTop: "10px",
//               height: "30px",
//               marginBottom: "10px",
//               textAlign: "centre",
//             }} type='email' name="email" onChange={handleChange}/><br/>
//             <label>Password</label><br/>
//             <input  style={{
//               width: "380px",
//               marginTop: "10px",
//               height: "30px",
//               marginBottom: "10px",
//               textAlign: "centre",
//             }} type="password" name='password'onChange={handleChange}/><br/>
//             <input  type='submit' style={{
//               marginLeft: "145px",
//               marginTop: "15px",
//               backgroundColor: " black",
//               fontWeight: "700",
//               border: "2px solid  black",
//               color:"white",
//               padding: "8px 35px",
//               borderRadius: "20px",
//             }}/>
//             <br/>
//            <u style={{marginLeft:"18%",marginTop:"10%", color:"red",cursor:"pointer"}} onClick={() => router('/register')}>New user? Register</u>
//            </fieldset>
//         </form>

        
//     </div>
//   )
// }

// export default Login




import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../Context/AuthContext";
import api from "./ApiConfig/Index";
import "./Style/Login.css"

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const route = useNavigate();
  const { state, login } = useContext(MyContext);

  // console.log(state?.currentuser);

  useEffect(() => {
    if (state?.currentuser) {
      route("/");
    }
  }, [state?.currentuser, route]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      try {
        const response = await api.post("/login", { user });

        if (response.data.success) {
          toast.success(response.data.message);

          const userData = response.data.userData;
          const token = response.data.token;
          login(userData, token);
          setUser({
            email: "",
            password: "",
          });
          route("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("All fields are mandatory");
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
                  onChange={handleChange}
                  type="email"
                  value={user.email}
                  placeholder="Enter Your Email"
                  name="email"
                />
              </div>
              <div className="allInputs" id="allInputspasswordLogin">
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
                  type={visible ? "text" : "password"}
                  placeholder="Enter Your password"
                  value={user.password}
                  name="password"
                />
              </div>
              <button className="btnSignUp" type="submit">
                Log In
              </button>

              <div className="socialSections">
                <p>Get Connected with..!!</p>

                <div className="socialIcons">
                  <div>
                    <AiFillLinkedin />
                  </div>
                  <div>
                    <AiFillFacebook />
                  </div>
                  <div>
                    <AiFillInstagram />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

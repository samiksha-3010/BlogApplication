import React, { useContext, useEffect, useState } from 'react'
import "./Style/Navbar.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
  const router = useNavigate()

  const { state,login,logout} = useContext(AuthContext)
  // console.log(state, "- state from context in navbar file")

  const [user, setUser] = useState({});
  // console.log(user, "user in profiel")

  useEffect(() => {
      if (state?.user) {
          setUser(state?.user)
      } else {
          setUser({});
      }
  }, [state])
  return (
    <div>

<div className='navigation'>

<h4 onClick={() => router('/add-blog')}>ADD BLOGS</h4>
<h4 onClick={() => router('/all-blog')}>ALL BLOGS</h4>
{/* <h4 onClick={() => router('/profile')}>{state.user.name} Profile</h4> */}

{user?.email ?
                    <>
                        <h3 onClick={() => router('/products-from-backend')}>Products</h3>
                        <h3 onClick={() => router('/profile')} style={{ marginLeft: "40px" }}>Profile - {user?.name}</h3>
                        <h3 onClick={logout} style={{ marginLeft: "40px" }}>Logout </h3>
                        <h3 onClick={() => router('/cart')} style={{ marginLeft: "40px" }}>Cart</h3>
                    </>
                    :
                    <h3 onClick={() => router('/login')}>Login</h3>}

{/* <h4 onClick={() => router('/')}>ABOUT US</h4>               
 <h4>CONTACT US</h4>          
 <h4>SERVICE</h4>
 <h4 onClick={() => router('/register')}>Login</h4>
 <p onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</p> */}
 

</div>
    </div>

  )
}
export default Navbar



// import React, { useContext, useEffect, useState } from 'react'
// import "./Style/Navbar.css"
// import { NavLink, Route, useNavigate } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai";
// import { BsFillXSquareFill } from "react-icons/bs";
// import { AuthContext } from '../../Context/AuthContext'

// const Navbar = () => {
//   const router = useNavigate()
//   const [dropDown, setDropDown] = useState(false);


//   const { state,login,logout} = useContext(AuthContext)
//   // console.log(state, "- state from context in navbar file")

//   const [user, setUser] = useState({});
//   // console.log(user, "user in profiel")

//   useEffect(() => {
//       if (state?.user) {
//           setUser(state?.user)
//       } else {
//           setUser({});
//       }
//   }, [state])
  
//   const extractDropDown = () => {
//     setDropDown(!dropDown);
//   };

//   return (
//     <>
//     {dropDown ? (
//       <div className="dropSideNav">
//         {/* dropdown starts */}

//         <div className="innerDropDownContainer">
//           <h2 onClick={() => router("/")}>
//             {state?.currentuser?.name.toUpperCase()}
//           </h2>
//           <h2 onClick={() => Route("/")}>Home</h2>
//           <h2 onClick={() => router("/allblogs")}>ALL TRAVEL BLOGS</h2>

//           {state?.currentuser?.role == "Admin" ? (
//             <NavLink to="/addblog" className="innerDropDownContainer">
//               <h2>CREATE BLOG</h2>
//             </NavLink>
//           ) : null}
//           {state?.currentuser?.role == "User" ? (
//             <div className="innerDropDownContainer">
//               <h2>SAVED BLOGS</h2>
//               <h2>LIKED BLOGS</h2>
//               <h2>ABOUT US</h2>
//               <h2>CONTACT US</h2>
//               <h2>FEEDBACK</h2>
//             </div>
//           ) : null}
//         </div>

//         {state?.currentuser ? (
//           <div className="logout" onClick={logout}>
//             <h1>LOGOUT</h1>
//           </div>
//         ) : (
//             <div className="logout" onClick={() => Route("/login")}>
//             <h1>LOGIN</h1>
//           </div>
//         )}

//         {/* dropDown end */}
//       </div>
//     ) : null}

//     <div className="leftNav">
//       {dropDown ? (
//         <h1 onClick={extractDropDown}>
//           <BsFillXSquareFill />
//         </h1>
//       ) : (
//         <h1 onClick={extractDropDown}>
//           <AiOutlineMenu />
//         </h1>
//       )}
//     </div>
//   </>

//   )
// }
// export default Navbar



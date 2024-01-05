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



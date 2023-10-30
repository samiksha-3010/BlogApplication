import React from 'react'
import "./Style/Navbar.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const router = useNavigate()
  return (
    <div>

<div className='navigation'>
<h4 onClick={() => router('/add-blog')}>ADD BLOGS</h4>
<h4 onClick={() => router('/all-blog')}>ALL BLOGS</h4>
<h4 onClick={() => router('/')}>ABOUT US</h4>               
 <h4>CONTACT US</h4>          
 <h4>SERVICE</h4>
 <h4 onClick={() => router('/register')}>LOGIN</h4>
 <h4>LOGOUT</h4>
</div>
    </div>

  )
}

export default Navbar



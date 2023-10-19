import React from 'react'
import  "./Style/Home.css"
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className="homepageContainer">
   <Navbar/>
    <div className="mainHomecontainer">
      <h1>WELCOME TO MY NEW BLOG</h1>
    </div>
  </div>
  )
}

export default Home
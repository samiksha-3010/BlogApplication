import React from 'react'
import  "./Style/Home.css"
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className="homeContainer">
    <Navbar />
    <div className="mainHomeBody">
      <h1>WELCOME TO MY NEW BLOG</h1>
    </div>
  </div>
  //   <div className="homepageContainer">
  //  <Navbar/>
  //   <div className="mainHomecontainer">
  //     <h1 style={{color:"black"}}>WELCOME TO MY NEW BLOG</h1>
  //   </div>
  // </div>
  )
}

export default Home
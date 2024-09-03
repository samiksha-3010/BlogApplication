import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Blogs/Home';
import Navbar from './Component/Blogs/Navbar';
import AddBlog from './Component/Blogs/AddBlog';
import AllBlog from './Component/Blogs/AllBlog';
import SingleBlog from './Component/Blogs/SingleBlog';
import Register from './Component/Blogs/Register';
import Login from './Component/Blogs/Login';
import Error from './Component/Blogs/Socal';
import Profile from './Component/Blogs/Profile';
import Socal from './Component/Blogs/Socal';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/'element={<Home/>}/>
        <Route exact path='/login'element={<Login/>}/>
        <Route exact path='/register'element={<Register/>}/>
        <Route exact path='/Add-blog'element={<AddBlog/>}/>
        <Route exact path='/All-blog'element={<AllBlog/>}/>
        <Route exact path='/profile'element={<Profile/>}/>
        <Route exact path='/socal'element={<Socal/>}/>


        <Route exact path='/singl-eblog/:id'element={<SingleBlog/>}/>
        {/* <Route exact path='/*'element={<Error/>}/> */}

        
      </Routes>
      

     
      
    </div>
  );
}

export default App;

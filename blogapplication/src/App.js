import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Blogs/Home';
import Navbar from './Component/Blogs/Navbar';
import AddBlog from './Component/Blogs/AddBlog';
import AllBlog from './Component/Blogs/AllBlog';
import SingleBlog from './Component/Blogs/SingleBlog';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/'element={<Home/>}/>
        <Route exact path='/Add-blog'element={<AddBlog/>}/>
        <Route exact path='/All-blog'element={<AllBlog/>}/>
        <Route exact path='/single-blog'element={<SingleBlog/>}/>

        
      </Routes>
      

     
      
    </div>
  );
}

export default App;

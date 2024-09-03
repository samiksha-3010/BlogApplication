

import axios from 'axios'
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/AddBlog.css"
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const [detail, setDetail] = useState({
    title: "",
    image: "",
    description: "",
    categories: "",
  });

  //   console.log(detail);
  const route = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, image, description, categories } = detail;
    if (title && image && description && categories) {
        // console.log(title, image, description, categories);
      const token = JSON.parse(localStorage.getItem("token"));
      try {
               const  response = await axios.post("http://localhost:8000/add-blog",{detail,token}) 


        if (response.data.success) {
          toast.success(response.data.message);
          setDetail({
            title: "",
            image: "",
            description: "",
            categories: "",
          });
          route("/all-blog");
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

  // useEffect(() => {
  //   if (state) {
  //     if (state?.currentuser?.role != "Admin") {
  //       route("/");
  //     }
  //   }
  // }, [state?.currentuser, route]);
  return (
    <>
    <h2>My Food Blog</h2>
      <div className="border">
   

        <div className="addBlogSection">
          <form className="adddBlogInputContainer" onSubmit={handleSubmit}>
        
            <fieldset className='.fildest'>
            <div >
              <label htmlFor="">BLOG TITLE</label> <br />
              <input className='input'
                type="text"
                placeholder="ENTER TITLE"
                onChange={handleChange}
                value={detail.title}
                name="title"
              />
            </div>
            <div >
              <label htmlFor="">BLOG IMAGE</label> <br />
              <input className='input'
                type="text"
                placeholder="ENTER URL IMAGE"
                onChange={handleChange}
                value={detail.image}
                name="image"
              />
            </div>
            <div >
              <label htmlFor="">CATEGORIES</label> <br />
              <select className='input'
                onChange={handleChange}
                name="categories"
                value={detail.categories}
              >
                <option value="SELECT FOOD CATEGORY">SELECT FOOD CATEGORY</option>
                <option value="Delicious Pasta">Delicious Pasta</option>
                <option value="Delicious Burger">Delicious Burger</option>
                <option value="Delicious PIZZA">Delicious PIZZA</option>
                <option value="Delicious Smosa">Delicious Smosa</option>
              </select>
            </div>
            <div >
              <label htmlFor="">BLOG DESCRIPTION</label><br />
              <textarea className='input'
                cols="30"
                rows="9"
                placeholder="Enter Description"
                onChange={handleChange}
                value={detail.description}
                name="description"
              ></textarea>
            </div>
            <div >
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
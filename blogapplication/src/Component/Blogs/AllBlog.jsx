import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Style/AllBlog.css"

import { useNavigate } from "react-router-dom";
const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const route = useNavigate();

  console.log(allBlogs);
  useEffect(() => {
    async function getAllBlogs() {
      try {
      const  response = await axios.get("http://localhost:8000/all-blog",{allBlogs}) 
        if (response.data.success) {
          setAllBlogs(response.data.allBlogs);
        } else {
          setAllBlogs([]);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllBlogs();
  }, []);

  console.log(allBlogs)

  const filterCatergory = async (e) => {
    const { value } = e.target;

    try {
      const response = await axios.get("http://localhost:8000/all-blog",{allBlogs});
      const data = response.data.allBlog;
      if (value == "Delicious Pasta") {
        const filterBlogs = data.filter(
          (blog) => blog.categories == "Delicious Pasta"
        );
        setAllBlogs(filterBlogs);
      } else if (value == "Delicious Burger") {
        const filterBlogs = data.filter(
          (blog) => blog.categories == "Delicious Burger"
        );

        setAllBlogs(filterBlogs);
      } else if (value == "Delicious PIZZA") {
        const filterBlogs = data.filter((blog) => blog.categories == "Delicious PIZZA");

        setAllBlogs(filterBlogs);
      } else if (value == "Delicious Smosa") {
        const filterBlogs = data.filter((blog) => blog.categories == "Delicious Smosa");

        setAllBlogs(filterBlogs);
      } else {
        setAllBlogs(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="allBlogsContainer">
        {/* <Navbar/> */}
        <div className="allBlogsMainSection">
          <div className="topRight">
            <div className="topSearchInput">
              <div className="searchBlogIcon">
              </div>
              <input type="text" placeholder="Search Item" />
            </div>
            <div>
              <select onChange={filterCatergory}>
                <option value="">Categories</option>
                <option value="Delicious Pasta">Delicious Pasta</option>
                <option value="Delicious Burger">Delicious Burger</option>
                <option value="Delicious PIZZA ">Delicious PIZZA</option>
                <option value="Delicious Smosa">Delicious Smosa</option>
              </select>
            </div>
          </div>

          {allBlogs?.length ? (
            <div className="mainBlogSections">
              {allBlogs?.map((blog) => (
                <div
                  onClick={() => route(`/singl-eblog/${blog._id}`)}
                  key={blog._id}
                  className="singleBlogSection"
                >
                  <div className="singleBlogImage">
                    <div className="innerImage">{blog.categories}</div>
                    <img src={blog.image} alt="" />
                  </div>
                  <div className="singleBlogDetails">
                    <h5>{blog.title}</h5>
                    <p className="time">{blog.date}</p>
                    <p className="description">
                      {blog.description.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="noBlogs">No Food Blog </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
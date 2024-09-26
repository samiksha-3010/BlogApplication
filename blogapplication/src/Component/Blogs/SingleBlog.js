
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import  "./Style/SingleBlog.css"



const SingleBlog = () => {
  const [singleBlog, setSingleBlog] = useState({});
  const [edit, setEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const { id } = useParams();
  const [comment, setComment] = useState("");
   const { state } = useContext(AuthContext);
  const route = useNavigate();

  console.log(id, "params");
  console.log(singleBlog);
   console.log(edit);

  useEffect(() => {
    async function getSingleBlog() {
      try {
        const  response = await axios.post("http://localhost:8000/singl-eblog",{id}) 

        // const response = await api.post("/singleblog", { id });

        if (response.data.success) {
          setSingleBlog(response.data.singleBlog);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getSingleBlog();
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const editBlog = async (id) => {
    setEditModal(true);
    try {
      const token = JSON.parse(localStorage.getItem("blogtoken"));
      const  response = await axios.post("http://localhost:8000/edit-blog",{id,token}) 

      // const response = await api.post("editblog", { token, id });

      if (response.data.success) {
        setEdit(response.data.editblog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdatedBlog = async (e) => {
    e.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const  response = await axios.post("http://localhost:8000/update-blog",{id,token}) 

      // const response = await api.post("/updateblog", { edit, token, id });
      if (response.data.success) {
        toast.success(response.data.message);
        setEditModal(false);
        setSingleBlog(response.data.updatedBlog);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const  response = await axios.post("http://localhost:8000/add-blog",{id,token}) 

      // const response = await api.post("/deleteblog", { token, id });
      if (response.data.success) {
        route("/all-blog");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendComment = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const  response = await axios.post("http://localhost:8000/add-blog",{id,token}) 

      // const response = await api.post("/addcomment", { token, comment, id });
      if (response.data.success) {
        toast.success(response.data.message);
        setComment("");
        setSingleBlog(response.data.afterCommentUpdate);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="singleBlogContainer">
        {/* <Navbar /> */}
        <h1>No product Found</h1>

        <div className="singleBlogMainSection">
          {editModal ? (
            <div className="editBlogContainer">
              <div className="editImage">
                <img src={edit.image} alt="" />
              </div>
              <form className="editFormSection" onSubmit={submitUpdatedBlog}>
                <div>
                  <div className="closeBtn" onClick={() => setEditModal(false)}>
                    {/* <BsFillXSquareFill /> */}
                  </div>
                  <input
                    type="text"
                    value={edit.title}
                    onChange={handleChange}
                    name="title"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={edit.image}
                    onChange={handleChange}
                    name="image"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={edit.description}
                    onChange={handleChange}
                    name="description"
                  />
                </div>
                <div>
                  <select
                    value={edit.categories}
                    onChange={handleChange}
                    name="categories"
                  >
                    <option value="Delicious Pasta">Delicious Pasta</option>
                    <option value="Delicious Burger">Delicious Burger</option>
                    <option value="Delicious PIZZA">Delicious PIZZA</option>
                    <option value="Delicious Smosa">Delicious Smosa</option>
                  </select>
                </div>
                <div>
                  <button className="updateBtn" type="submit">
                    UPADTE
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          <div className="singleBlogPage">
            {state?.currentuser?.role == "Admin" && (
              <div className="editDelete">
                <div className="edit" onClick={() => editBlog(singleBlog._id)}>
                  {/* <FiEdit /> */}
                </div>
                <div
                  className="delete"
                  onClick={() => deleteBlog(singleBlog._id)}
                >
                  {/* <AiOutlineDelete /> */}
                </div>
              </div>
            )}
            {state?.currentuser?.role == "User" && (
              <div className="heartSaveIcons">
                <div className="heart">
                  {/* <AiFillHeart /> */}
                </div>
                <div className="save">
                  {/* <BsFillBookmarkFill /> */}
                </div>
              </div>
            )}
            <div className="date">{singleBlog.date}</div>
            <div className="singlePageBlogImage">
              <img src={singleBlog.image} alt="" />
            </div>
            <div className="singlePageBlogDetails">
              <h5>{singleBlog.title}</h5>
              <p>{singleBlog.description}</p>
              <span className="knowmore">Know More</span>
            </div>

            {state?.currentuser ? (
              <div className="addComment">
                <h5>Add a Comment</h5>
                <div>
                  <input
                    placeholder="Add a comment"
                    name="comment"
                    value={comment}
                    onChange={sendComment}
                  />
                  {comment ? (
                    <button
                      onClick={() => submitComment(singleBlog._id)}
                      className="sendCommentBtn"
                    >
                      Send
                    </button>
                  ) : null}
                </div>

                <div className="commentsHeading">
                  <h5>Comments</h5>
                  <div className="comments">
                    {singleBlog?.comments?.map((comment) => (
                      <div key={comment.commentId}>
                        <h6>Name : {comment.name.toUpperCase()}</h6>
                        <p>comment : {comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="loginForComments">Log in to Comment</div>
            )}
          </div>
        </div>
      </div>
    
    </>
  );
};

export default SingleBlog;


// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from 'react-hot-toast';

// const SingleBlog = () => {
//   const [singleBlogData, setSingleBlogData] = useState({});
//   const { id } = useParams();
//   const route = useNavigate()
//    console.log(singleBlogData)
//   // const { state } = useContext(AuthContext)
//   useEffect(() => {
//       if (id) {
//           async function getSingleBlogData() {
//               try {
//                 const  response = await axios.post("http://localhost:8000/singl-eblog",{Blog:id}) 
//                   // const response = await api.post('/buyer/get-single-product-data', { productId: id })
//                   if (response.data.success) {
//                       setSingleBlogData(response.data.Blog)
//                   }else{
//                     toast.error(response.data.message)
//                   }
//               } catch (error) {
//                 console.log(error.message)
//               }
//           }
//           getSingleBlogData()
//       }
//   }, [id])

//   return (
//       <div>
//           {singleBlogData?.name ? <div style={{ display: 'flex', justifyContent: 'space-around' }}>

//               <div style={{ width: "45%", height: "600px", border: "2px solid red" }}>
//                   <img style={{ width: "100%", height: "100%" }} src={singleBlogData.image} alt='img' />
//               </div>
//               <div style={{ width: "45%", height: "600px" }}>
//                   <h1>{singleBlogData.name}</h1>
//                   <h3>title : {singleBlogData.title}</h3>
//                   <h3>description : {singleBlogData.description}</h3>
//               </div>

//           </div> : <div>Loading....</div>}

//     </div>
//   )
// }

// export default SingleBlog;
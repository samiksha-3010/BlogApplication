import express  from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors'
import morgan from "morgan"
import { Login, Register, getCurrentUser, like,  } from "./Controller/UserController.js"
import { addBlog, allBlogs, deliteBlog, editBlog, singleBlog, updateBlog } from "./Controller/BlogController.js";
// import { addComment } from "./Controller/AddCommentControoler.js";


const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
dotenv.config();


app.get("/",(req,res) => {
  res.send("working Your Server..")
})

app.post("/register",Register)
app.post("/login",Login)
app.get("/get-current-User",getCurrentUser)
app.post("/like",like)


app.post("/add-blog",addBlog)
app.get("/all-blog",allBlogs)
app.post("/singl-eblog", singleBlog);
app.post("/edit-blog", editBlog);
app.post("/update-blog", updateBlog);
app.post("/delete-blog",  deliteBlog);

// app.post("/add-comment",  addComment);
// add, all, single,delite,edit,




mongoose.connect(process.env.Mongo_URL).then(() =>{
    console.log("connected to DB..")
})

app.listen(8000, () =>{
    console.log("Listening on port 8000")
})


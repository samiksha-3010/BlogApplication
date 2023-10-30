import BlogModal from "../Model/BlogModal.js";
// add blogs
export const addBlog = async (req, res) => {
  try {
    const { title, image, categories, description} = req.body.detail;
    // console.log(title, image, description, categories);

    if (!title || !image || !description || !categories) {
      return res.status(404).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const newBlog = new BlogModal({
      title,
      image,
      description,
      categories,
    });

    await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "new blog added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allBlogs = async(req,res)=>{
    try {
        const allblog = await BlogModal.find({})
        if(allblog.length){
            return res.status(200).json({success:true,allBlogs:allblog})
        }
        return res.status(404).json({success:false,message:"No Blog Found"})
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
        
    }
}

export const singleBlog = async(req,res)=>{
  try {
    const {id} = req.body;
    if(!id){
      return res.status(404).json({success:false,message:"Id is required"})
    }
    const Blog = await BlogModal.findById(id);
    // console.log(Blog)
    if(Blog){
      return res.status(200).json({success:true,singleBlog:Blog})
    }
    return res.status(404).json({success:false,message:"Id is Not Valid"} )

    
  } catch (error) {
    return res.status(500).json({success:false,message:error.message})
    
  }
}

export const editBlog = async(req,res) =>{
  try{
    const {id}= req.body
    if(!id){
      return res.status(404).json({success:false,message:"Id is Required"})
    }
    const Blog = await BlogModal.findById(id);
    console.log(Blog)
    if(Blog){
      return res.status(200).json({success:true,editBlog:Blog})
    }
    return res.status(404).json({success:false,message:"Not Valid Id"})

    
  } catch (error) {
    return res.status(500).json({success:false,message:error.message})
    
  }
}

export const updateBlog = async(req,res)=>{
  try {
    const {id} = req.body
    const { title, image, description,categories} = req.body//.edit
    // console.log(title,image,categories,description)
    if(!title || ! image || !description || !categories || !id){
       return res.status(404).json({success:false,message:"All Fields Are Mandotory"})
    }
    const BlogUpdate = await BlogModal.findByIdAndUpdate(id,{title,image,description,categories},{new:true})
    if(BlogUpdate){
      return res.staus(200).json({ success:true,message:"update Blog Success",updateBlog:BlogUpdate })
    }
    return res.status(200).json({success:false,message:"Not Update Blog"})

  } catch (error) {
    return res.status({success:false,message:error.message})
    
  }

}
export const deliteBlog = async(req,res)=>{
 try {
  const {id} = req.body;
  if(!id){
    return res.status(404).json({success:false,message:"Id is Required"})
  }
  const Blog = await BlogModal.findByIdAndDelete(id)
  if(Blog){
    return res.status(200).json({success:true,message:"Blog Delite Success"})
  }
  return res.status(404).json({success:false,message:"Not Delite Blog}"})
  
 } catch (error) {
  return res.status(500).json({success:false,message:error.mess})
  
 }
}

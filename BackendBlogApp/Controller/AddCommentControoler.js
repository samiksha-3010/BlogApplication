// import { nanoid } from "nanoid"
// import UserModal from "../Model/UserModal"
// import BlogModal from "../Model/BlogModal"


// export const addComment = async(req,res)=>{
//     try {
//         const {token,id,comment} = req.body
//         if(!id || !token || !comment){
//             return res.status(404).json({success:false,message:"all field are mandotry"})
//         }
//         const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
//         if(!decodedToken){
//             return res.status(404).json({success:false,message:"not valid token"})
//         }
//         const userId = decodedToken?.userId;
//         const user = await UserModal.findById(userId)
//         const commentId = nanoid();
//         console.log(commentId)
//         if(user){
//             const  findBlogUpdate = await BlogModal.findByIdAndUpdate(id,{$push:{comments: {comment:comment,userId:userId,name:user.name,commentId:commentId}}},{new:true})
//         }
//         if(findBlogUpdate){
//             const afterupdate = await BlogModal.findById(id)
//             if(afterupdate){
//                 return res.status(200).json({success:true,message:"Comment addaed",aftercommentUpdate})
//             }
//         }
//         return res.status(201).json({
//             success: true,
//             message: "Not a valid user",
//           });
//     } catch (error) {
//         return res.status(500).json({success:false,message:error.message})
//     }
// }
// export const editComment = async(req,res)=>{
//     try {
        
//     } catch (error) {
//         return res.status(500).json({success:false,message:error.message})
        
//     }
// }


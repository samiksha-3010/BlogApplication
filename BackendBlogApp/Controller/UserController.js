
import UserModal from "../Model/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import BlogModal from "../Model/BlogModal.js";


// export const Register = async (req, res) => {
//     try {
//     //   const { name, email, password, role } = req.body.UserData;
//       const { name, email, password, number, role } = req.body.userData;
  
//       console.log(name, email, password, role);
  
//       if (!name || !email || !password || !role)
//         return res.status(404).json({
//           success: false,
//           message: "all fields are mandatory",
//         });
  
//       const isEmailExist = await UserModal.find({ email });
  
//       if (isEmailExist?.length) {
//         return res.status(404).json({
//           success: false,
//           message: "Email already registered Please try another email",
//         });
//       }
  
//       const hashPass = await bcrypt.hash(password, 10);
//       const userDetail = new UserModal({
//         name,
//         email,
//         password: hashPass,
//         role,
//       });
  
//       await userDetail.save();
  
//       return res.status(200).json({
//         success: true,
//         message: "Registered Success",
//         data: userDetail,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

export const Register = async (req, res) => {
  try {
    const { userData } = req.body;
    const { name, email, password, role, number } = userData;
    if (!name || !email || !password || !role || !number)
      return res.json({
        success: false,
        message: "All Feilds are Mandatory!",
      });

    const isEmailExist = await UserModal.find({ email: email });
    if (isEmailExist.length) {
      return res.json({
        success: false,
        message: "Email already exists! Try a new one.",
      });
    }

    const hashPassW = await bcrypt.hash(password, 10);

    const user = new UserModal({
      name,
      email,
      password: hashPassW,
      role,
      number,
    });

    await user.save();

    return res.json({
      success: true,
      message: "User Registerd Successfully!",
    });
  } catch (error) {
    return res.json({ success: "false", message: false });
  }
};


  export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.json({
          success : false,
          message: "All fields are mandtory..",
        });
  
      const user = await UserModal.findOne({ email: email });
      if (!user)
        return res.json({ success : false, message: "User not found.." });
  
      const isPasswordRight = await bcrypt.compare(password, user.password);
      // console.log(isPasswordRight, "isPasswordRight");
      if (isPasswordRight) {
        const userObeject = {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role
        };
          // console.log("Before ")
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // console.log(token, "token her");
        return res.json({
          success : true,
          message: "Login Successfull.",
          user: userObeject,
          token: token,
        });
      }
      return res.json({ success : false, message: "Password is wrong." });
    } catch (error) {
      return res.json({ success : false, message: error.message });
    }
  };

  export const getCurrentUser = async(req,res)=>{
    try {
        const {token} = req.body
        if(!token){
            return res.status(404).json({success:false,message:"Token IS required!"})

        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(decodedData,"decodedData")
        if(!decodedData){
            return res.status(404).json({success:false,message:"Not Valid Json Token!"})
        }
        const userId = decodedData?.userId;
        const user = await UserModal.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"User NOt Found..."})
        }
        const userObeject={ 
            name:user?.name,
            email:user?.email,
            _id:user?.id,
            role:user?.role
        };
        return res.status(200).json({success:true,message:userObeject}) 
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }

  }

  export const like = async (req, res) => {
    try {
      const { id, token } = req.body;
  
      if (!token || !id) {
        return res.status(404).json({
          success: false,
          message: "id and token is required",
        });
      }
  
      const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
  
      if (!decodeToken) {
        return res.status(404).json({
          success: false,
          message: "token is not valid",
        });
      }
  
      const userId = decodeToken?.userId;
  
      const blog = await BlogModal.findById(id);
  
      if (blog) {
        if (blog?.likes) {
          let flag = false;
  
          for (let i = 0; i < blog?.likes.length; i++) {
            if (blog?.likes[i].includes(userId)) {
              flag = true;
            }
          }
  
          if (!flag) {
            blog?.likes.push(userId);
            await blog.save();
            return res.status(200).json({
              success: true,
              message: "Liked",
              isLiked: true,
            });
          }
  
          const filterBlogLikes = blog?.likes?.filter((e) => e != userId);
  
          blog.likes = filterBlogLikes;
          await blog.save();
          return res.status(200).json({
            success: true,
            message: "UnLiked",
            isLiked: false,
          });
        }
      }
  
      return res.status(404).json({
        success: false,
        message: "blog not found",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  


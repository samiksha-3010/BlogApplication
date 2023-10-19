import jwt from "jsonwebtoken";
import UserModal from "../Model/UserModal.js";
export const admin = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "token is required" });

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodeToken) {
      return res
        .status(404)
        .json({ success: false, message: "not  valid token" });
    }

    const userId = decodeToken?.userId;

    const user = await UserModal.findById(userId);

    if (!user?.role == "Admin") {
      return res.status(404).json({
        success: false,
        message: "not a admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const user = async(req,res,next)=>{
    try {
        const { token} = req.body;
        if(!token)
        return res.status(404)({success:false,message:"token is Require"})
         const decodedToken = jwt.verify(token,process.env.SECRET_KEY)
         if(!decodedToken){
            return res.status(404).json({success:false,message:"Token is Not Valid"})
         }
         const userId = decodedToken?.userId;
         const user = await UserModal.findById(userId) 

         if(!user?.role == "User"){

         return res.status(404)({success:false,message:"user not Valid"})
         }
         next()
    } catch (error) {
        return res.status(500).json({success:"false",message:error.message})
        
    }
}
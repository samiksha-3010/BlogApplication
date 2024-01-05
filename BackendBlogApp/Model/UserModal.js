import Mongoose ,{Schema } from "mongoose";
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
  
    role:{
        type: String,
        enum: ["Admin", "User"],
    },
    bookmark:{
        type: [String]
    },
  
   

  

})

export default Mongoose.model("User",userSchema);
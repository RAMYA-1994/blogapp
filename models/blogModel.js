const mongoose = require("mongoose");
const blogSchema=new mongoose.Schema({
    tittle:{
        type:String,
        require:[true,"tittle is required"],
    },
    description:{
        type:String,
        required:[true,"description is required"],
    
    },
    Image:{
        type:String,
        // required:[true,"image is required"],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:[true,"user id is required"],
    },

},{timestamps:true})
const blogModel=mongoose.model('Blog',blogSchema)
module.exports=blogModel
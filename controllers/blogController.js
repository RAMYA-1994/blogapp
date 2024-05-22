const mongoose=require("mongoose");
const blogModel=require("../models/blogModel");
const userModel=require("../models/userModel");
exports.getAllBlogsController= async(req,res) => {
    try{
        const blogs=await blogModel.find({});
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:"No blogs found",

            });
        }
        return res.status(200).send({
            blogCount:blogs.length,
            success:true,
            message:"All blogs lists",
            blogs,
        })

    }catch(error){
        console.log(error);
        return res.status(200).send({
            success:false,
            message:"Error while getting blogs",
            error,
        });
    }
};

exports.createBlogController= async(req,res) => {
    try{
        const {tittle,description,image,user}=req.body;
        // validatio
        if(!tittle||!description||!image||!user){
            return res.status(400).send({
                success:false,
                message:"please provide all fileds",
            });
        }
        const exisitingUser=await userModel.findById(user)
        // validation
        if(!exisitingUser){
            return res.status(404).send({
                success:false,
                message:"unable to find user"
            })
        }
        const newBlog=new blogModel({tittle,description,image,user});
        const session=await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session});   
        exisitingUser.blogs.push(newBlog);
        await exisitingUser.save({session});
        await session.commitTransaction();
        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:"Blog created!",
            newBlog,
            
        })

    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while creating  blog",
            error,
        })
    }
};

exports.updateBlogController= async(req,res) => {
    const {id}=req.params;
        // const {tittle,description,image}=req.body
        console.log(req.body)
        // res.json(req.body)
    try{
        const blog=await blogModel.findByIdAndUpdate(
            id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"Blog updated",
            blog,
        });


    }catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error while getting blogs",
            error,
        })
    }
};

exports.getBlogsByIdController= async(req,res) => {
    try{
        const{id}=req.params
        const blog=await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                message:"blog not foundd with this",
            });
        }
            return res.status(200).send({
                success:true,
                message:"fetch single blog",
                blog,
            });
       

    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'error while getting single blog',
            error
        
        })

    }
};

exports.deleteBlogController= async(req,res) => {
    try{
await blogModel.findOneAndDelete(req.params.id).populate("user");
await blog.user.pull(blog);
await blog.user.save();
return res.status(200).send({
    success:true,
    message:"Blog deleted",
});
    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error while deleteing blog",
            blog,
        })
    }
};
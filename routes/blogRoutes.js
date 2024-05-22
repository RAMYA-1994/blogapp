const express=require("express")
const { getAllUsers } = require("../controllers/userController")
const { getAllBlogsController, createBlogController, updateBlogController, getBlogsByIdController, deleteBlogController } 
= require("../controllers/blogController")
//router object
const router=express.Router()
//routes
router.get('/all-blog',getAllBlogsController)
router.post('/create-blog',createBlogController)
router.put('/update-blog/:id',updateBlogController)
//single blog details
router.get('/get-blog/:id',getBlogsByIdController)
router.delete('/delete-blog/:id',deleteBlogController)
module.exports=router
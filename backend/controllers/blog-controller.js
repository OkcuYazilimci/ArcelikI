import mongoose from "mongoose";
import User from "../model/User.js";
import Blog from "../model/blog.js";
import { name } from "ejs";

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {

        blogs = await Blog.find({}).populate('user', 'displayName email imageurl -_id').select('title description user image createdAt -_id')
    }catch(err){
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error finding user by ID" });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this ID" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving blog and updating user" });
    }
    console.log(`new blog name ${blog.title} created by ${existingUser.displayName}`);
    return res.status(200).json({blog: {title: blog.title}, user: {title: existingUser.displayName}});
};


export const updateBlog = async (req, res, next) => {
    const {title, description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        description
        })
    } catch (err) {
        return console.log(err)
    }
    if(!blog) {
        return res.status(500).json({message: "Unable to Update Blog"})
    }
    return res.status(200).json({blog})
};

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blogs;
    let user;
    try{
        user = await User.findById(id);
        blogs = await Blog.find({}).populate('user', 'displayName email imageurl -_id').select('title description user image createdAt -_id')
    } catch (err) {
        console.log(err);
    }
    if(!blogs) {
        return res.status(404).json({message: "No Blog Found!"})
    }
    return res.status(200).json({blogs})
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch(err) {
        console.log(err);
    }
    if(!blog) {
        return res.status(400).json({message: "Unable to Delete"})
    }
    return res.status(200).json({message: "Succesfully Deleted"})
};
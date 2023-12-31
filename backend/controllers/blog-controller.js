import { upload } from '../middleware/multer.js';
import { uploadImage } from '../controllers/storage-controller.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import mongoose from 'mongoose';
import Blog from '../model/Blog.js';
import User from '../model/User.js';

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {

        blogs = await Blog.find({})
        .populate('user', 'displayName email imageurl -_id')
        .select('title description user image createdAt -_id')
        .sort({createdAt: -1});
    }catch(err){
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
};

export const getAllAdmin = async(req, res, next) => {
    let blogs;
    try {

        blogs = await Blog.find({})
        .populate('user', 'displayName email imageurl -_id')
        .select('title description user image createdAt _id')
        .sort({createdAt: -1});
    }catch(err){
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
};

export const addBlog = async (req, res, next) => {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    const { title, description, user } = req.body;
    const { file } = req;

    if (!file) {
        console.error('No file found in the request.');
        return res.status(400).json({ message: 'No file found in the request.' });
    }

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

    const storageFB = getStorage();
    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
        contentType: file.mimetype,
    };

    try{
    await uploadBytesResumable(storageRef, file.buffer, metadata);

    const imageURL = await getDownloadURL(storageRef);

    const blog = new Blog({
        title,
        description,
        image: imageURL,
        user,
    });
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
    console.log(`new blog named: ${req.body.title} created by: ${existingUser.displayName}`);
    return res.status(200).json({Blog: {title: req.body.title}, user: {title: existingUser.displayName}});
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
        blogs = await Blog.find({user}).populate('user', 'displayName email imageurl -_id').select('title description user image createdAt -_id')
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
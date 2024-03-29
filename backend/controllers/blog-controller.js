import { generateImage } from "./imageAİ-controller.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from "../config/firebaseConfig.js";
import mongoose from 'mongoose';
import Blog from '../model/Blog.js';
import User from '../model/User.js';

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find({})
        .populate('user', 'displayName email imageurl _id')
        .select('title description user image createdAt _id')
        .sort({createdAt: -1})
        .limit(12);
    }catch(err){
        return res.status(500).json({ error: 'Server Error', details: err.message});
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
        .sort({createdAt: -1})
        .limit(10);
    }catch(err){
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
};

export const searchBlog = async (req, res) => {
    const searchTerm = req.query.search;

    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    console.log("---ESCAPED----", escapedSearchTerm);

    if (escapedSearchTerm.length < 3 || escapedSearchTerm.length > 15) {
        return res.status(400).json({ message: "Wrong format" });
    }

    const regexPattern = new RegExp(escapedSearchTerm, "i");
    try {
        const matchingUsers = await User.find({ displayName: { $regex: regexPattern } }, '_id');
        const userIds = matchingUsers.map(user => user._id);
    
        // Step 2: Find blogs that match the title/description or are authored by one of the matching users
        const blogResult = await Blog.find({
            $or: [
                { title: { $regex: regexPattern } },
                { description: { $regex: regexPattern } },
                { user: { $in: userIds } } // Assuming 'user' refers to a single userId in Blog schema
            ]
        }).populate('user', 'displayName');
        
    /*const userResult = await User.find({ displayName: { $regex: regexPattern }},
        {
        password: 0,
        emailToken: 0,
        createdAt: 0,
        firstName: 0,
        lastName: 0,
        isEmailVerified: 0,
        });*/

    const bothResult = {
        blogResult,
    }

    res.status(200).json(bothResult); 
    } catch(err) {
        res.status(404).json({message: "Unable to Search"});
    }
} 

export const addBlog = async (req, res, next) => {

    const { title, description} = req.body;
    const userId = req.user;

    console.log(userId);

    let existingUser;
    try {
        existingUser = await User.findById(userId);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error finding user by ID" });
    }

    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this ID" });
    }

    try {

        const response = await generateImage(description);
        const firstItem = response.openai.items[0];
        console.log(firstItem);
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`;
        const storageRef = ref(firebase.storage, fileName);
        const metadata = {
            contentType: firstItem.contentType
        };
        
        const myBuffer = Buffer.from(firstItem.image, 'base64');
        await uploadBytesResumable(storageRef, myBuffer, metadata);
        console.log('Image uploaded successfully.');
        const imageURL = await getDownloadURL(storageRef);
        console.log(imageURL);
        const blog = new Blog({
        title,
        description,
        image: imageURL,
        user: userId,
        displayName: existingUser.displayName,
    });

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
        console.log(`blog saved to MongoDB succesfully`)

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving blog" });
    }
    console.log(`new blog named: ${req.body.title} created by: ${existingUser.displayName}`);
    return res.status(200).json({Blog: {title: req.body.title}, user: {title: existingUser.displayName},
    });
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

export const getById = async (req, res) => {
    const id = req.user;
    console.log("\n Id right: ",id);

    let blogs;
    let user;
    try{
        user = await User.findById(id);
        blogs = await Blog.find({user}).populate('user', 'displayName email imageurl _id').
        select('title description user image createdAt _id').sort({createdAt: -1});
        console.log(blogs);
    } catch (err) {
        console.log(err);
    }
    if(!blogs) {
        return res.status(404).json({message: "No Blog Found!"})
    }
    return res.status(200).json({blogs})
};

export const getWithId = async (req, res) => {
    const id = req.params.id;
    console.log("\n Id right: ",id);

    let blogs;
    let user;
    try{
        user = await User.findById(id);
        blogs = await Blog.find({user}).populate('user', 'displayName email imageurl _id').
        select('title description user image createdAt _id').sort({createdAt: -1});

    } catch (err) {
        console.log(err);
    }
    if(!blogs) {
        return res.status(404).json({message: "No Blog Found!"})
    }
    return res.status(200).json({blogs})
};

export const deleteBlog = async (req, res) => {
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
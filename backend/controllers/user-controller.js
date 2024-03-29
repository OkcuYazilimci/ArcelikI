import User from "../model/User.js";
import bcrypt from 'bcryptjs'
import { createToken, refreshTokenCreate } from "../middleware/authToken.js";
import validator from "validator"
import { sendMail } from "../middleware/emailVerification.js";

export const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find().select('-password -_id -__v -googleId');
    }catch(err) {
        return console.log(err);
    }
    if(!users) {
        return res.status(404).json({message: "No user found"})
    }
    return res.status(200).json({users});
};

export const getAllUserAdmin = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err) {
        return console.log(err);
    }
    if(!users) {
        return res.status(404).json({message: "No user found"})
    }
    return res.status(200).json({users});
};

export const getUserById = async(req, res) => {
    const id = req.user;
    let users;
    try {
        users = await User.findById(id).select('_id displayName email imageurl blogs')
        .populate({
            path: 'blogs',
            select: '_id title description displayName image createdAt', 
        });
        console.log(users);
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({message: "User could not found!"})
    }
   
    return res.status(200).json({
        users
    });
};

export const myProfile = async(req, res) => {
    const id = req.params.id;
    let users;
    try {
        users = await User.findById(id).select('_id displayName email imageurl blogs')
        .populate({
            path: 'blogs',
            select: '_id title description displayName image createdAt', 
        });
    } catch (err) {
        res.status(401).json({ message: "Problem Occured while getting Profile"});
    }
    if(!users) {
        return res.status(404).json({message: "User could not found!"})
    }
   
    return res.status(200).json({
        users
    });
};

export const signup = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error checking existing user" });
    }

    if(!validator.isEmail(email)) {
        return res.status(400).json({ message: "Not a valid email! Please enter a valid one" });
    }
    
    if (existingUser) {
        return res.status(400).json({ message: "User already exists! Login instead" });
    }

    const saltRounds = 2;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const user = new User({
        displayName: firstName + " " +lastName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        emailToken: null,
        blogs: [],
    });
    const token = await createToken(user.email);
    user.emailToken = token
    console.log("email token:", token);

    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ message: "All fields must be filled!" });
    }

    try {
        await sendMail(user);
        await user.save();
        
        const responseUser = {
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            emailToken: user.emailToken
        };

        return res.status(201).json({ responseUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving user" });
    }
};

export const login = async(req, res, next) => {
    
    const {email, password} = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if(!existingUser) {
        return res.status(404).json( { message: "Could not find the user" });
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    
    if (!existingUser.isEmailVerified) {
        return res.status(400).json({ message: "Email is not verified! "});
    }

    if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }

    try {
        const token = await createToken(existingUser._id);
        const refreshToken = await refreshTokenCreate(existingUser.displayName, existingUser.email);

        existingUser.refreshToken = refreshToken;
        await existingUser.save();
        
        const idCookie = existingUser._id.toString();
        console.log("\n ID COOKIE HERE: ",idCookie);
        
        res.cookie("jsonwebtoken", refreshToken, {
            httpOnly:true,
            maxAge: 1000*60*60*5,
            sameSite: 'None',
            path: '/',
            secure: true,
        });

        const userResponse = {
            _id: existingUser._id,
            displayName: existingUser.displayName,
            email: existingUser.email,
            imageurl: existingUser.imageurl,
            blogs: existingUser.blogs,
            createdAt: existingUser.createdAt,
            isEmailVerified: existingUser.isEmailVerified
        };

        return res.status(200).json({
            user: userResponse,
            accessToken: token,
        });

        } catch(tokenError){
            console.error(tokenError);
            return res.status(500).json({ message: "Error creating token" });
        }
};

export const logout = (req, res) => {
    res.clearCookie('jsonwebtoken');
    res.send('Cookie deleted');
}
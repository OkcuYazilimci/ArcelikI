import User from "../model/User.js";
import bcrypt from 'bcryptjs'
import { createToken } from "../middleware/authToken.js";
import crypto from "node:crypto"
import validator from "validator"

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

export const getUserById = async(req, res, next) => {
    const id = req.params.id;
    let users;
    try {
        users = await User.findById(id).select('-_id displayName email imageurl')
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({message: "User could not found!"})
    }
    try {
        const token = await createToken(id);
        return res.status(200).json({
            users,
            token
        });
    } catch (tokenError) {
        console.error(tokenError);
        return res.status(500).json({ message: "Error creating token" });
    }
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
        emailToken:crypto.randomBytes(64).toString("hex"),
        blogs: [],
    });

    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ message: "All fields must be filled!" });
    }

    try {
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
        existingUser = await User.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(404).json( { message: "Could not find the user" });
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    
    /*if (!existingUser.isEmailVerified) {
        return res.status(400).json({ message: "Email is not verified! "});
    }*/

    if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" })
    }

    try {
        const token = await createToken(existingUser._id);
       
        res.cookie("jsonwebtoken", token, {
            httpOnly:true,
            maxAge: 1000*60*60*24,
            sameSite: 'None',
            path: '/',
            secure: true,
        });

        return res.status(200).json({
            message: "User logged in",
        });

        } catch(tokenError){
            console.error(tokenError);
            return res.status(500).json({ message: "Error creating token" });
        }
};

export const logout = () => {
    
}
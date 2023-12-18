import User from "../model/User.js";
import bcrypt from 'bcryptjs'

export const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find().select('-password -__v');
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


export const signup = async (req, res, next) => {
    const {name, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error checking existing user" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists! Login instead" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save();
        return res.status(201).json({ user });
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
        return res.status(404).json( {message: "Could not find the user"});
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: "succesfull"})
};
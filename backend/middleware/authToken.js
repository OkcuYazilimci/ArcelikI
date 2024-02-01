import Jwt from "jsonwebtoken";
import User from "../model/User.js";

const createToken = async (userId) => {
    try {
        const token = Jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('Token created successfully:', token);
        return token;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
};

const authorizateToken = async (req, res, next) => {
    try{ 
        const token = 
    req.headers['authorization'] && req.headers['authorization'].split(" ")[1];

    console.log("token",  token);
    if (!token) {
        return res.status(401).json({
            succeed: false,
            error: 'No token available',
        });
    }

    req.user = await User.findById(
        Jwt.verify(token, process.env.JWT_SECRET).userId
        );

    next();
    } catch (error) {
        res.status(401).json({
            error: 'Not Authorized'
        })
    }
};

const authorizateCookie = async (req, res, next) => {
    try{ 
        const token = req.cookies.jwtc;

    if (token) {
        Jwt.verify(token. process.env.JWT_SECRET, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                next();
            }
        })
    } else { 
        res.redirect("localhost:3001");
    }

    req.user = await User.findById(
        Jwt.verify(token, process.env.JWT_SECRET).userId
        );

    next();
    } catch (error) {
        res.status(401).json({
            error: 'Not Authorized'
        })
    }
};

export { createToken , authorizateToken }

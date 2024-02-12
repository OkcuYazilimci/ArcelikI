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

const authorizeCookie = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;

        if (!token) {
            return res.redirect(process.env.CLIENT_LOGIN);
        }

        Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                return res.status(401).json({
                    error: 'Not Authorized, invalid token'
                });
            } else {
                req.user = await User.findById(decoded.userId);
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            error: 'Not Authorized, verification failed'
        });
    }
};

const checkUser = async (req, res ,next) => {
    const token = req.cookies.jsonwebtoken;

    if (token) {
        Jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
    } 

export { createToken , authorizeCookie, authorizateToken, checkUser}

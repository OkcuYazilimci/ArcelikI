import Jwt from "jsonwebtoken";
import User from "../model/User.js";

const createToken = async (userId) => {
    try {
        const token = Jwt.sign({userId} ,process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(process.env.JWT_SECRET)
        console.log('Token created successfully:', token);
        return token;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
};

const authorizeToken = async (req, res, next) => {
    
    try{ 
        const token = 
        req.headers['authorization'] && req.headers['authorization'].split(" ")[1];

        console.log("token", token);
        if (!token) {
            return res.status(401).json({
            succeed: false,
            error: 'No token available',
            });
        }
        Jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    console.log(err.message);
                    return res.status(401).json({
                        error: 'Not Authorized, invalid token'
                    });
                } else {
                    req.user = decoded.userId
                    console.log("req user id: ", req.user);
                    next();
                }
                });
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
                req.user = decoded.userId
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

const authorizeEmail = async (req, res, next) => {
    try {
        const emailToken = req.params.emailToken;
        console.log("email Token ---: ", emailToken);

        if (!emailToken) {
            return res.status(404).json({message:'there is no token'})
        }

        Jwt.verify(emailToken, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                return res.status(401).json({
                    error: 'Not Authorized, invalid token'
                });
            } else {
                console.log("Decoded JWT: ", decoded);
                req.email = decoded.userId;
                console.log(req.email);
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

export { createToken , authorizeCookie, authorizeToken, authorizeEmail}

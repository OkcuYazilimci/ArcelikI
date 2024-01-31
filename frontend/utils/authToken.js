import jwt from "jsonwebtoken";

const createToken = async (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log('Token created successfully:', token);
        return token;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
};

export { createToken };
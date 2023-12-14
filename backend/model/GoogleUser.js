import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    }, discplayName: {
        type: String,
        required: true
    }, firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }, createdAt: {
        type: String,
        required: true
    }
})

export default mongoose.model('UserG', GoogleUserSchema)

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    imageurl: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailToken: {
        type: String
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog", required: false}],
})

userSchema.index({ displayName: 'text' });

export default mongoose.model("User", userSchema); //it will  be stored as users in mongo DB
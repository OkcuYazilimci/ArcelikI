import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    imageurl: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: false }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);

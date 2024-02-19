import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

blogSchema.index({ title: 'text', description: 'text' });

export default mongoose.model("Blog", blogSchema);
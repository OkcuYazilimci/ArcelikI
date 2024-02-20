import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30*86400
    }
});

const RefreshToken = mongoose.model.apply("RefreshToken", refreshTokenSchema);

export default RefreshToken;
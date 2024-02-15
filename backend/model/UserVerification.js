import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    userId: {
        type: String,
        required: false,
    },
    emailToken: {
        type: String,
        required: false,
    }
})
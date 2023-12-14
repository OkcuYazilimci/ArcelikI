import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    },
    imageurl: {
        type: String,
        required: false,
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog", required: true}],
})
export default mongoose.model("User", userSchema); //it will  be stored as users in mongo DB
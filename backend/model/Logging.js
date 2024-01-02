import mongoose, { Schema } from "mongoose";

const LoggingSchema = new Schema({
    logging: {
        type: String,
        required: false
    },
    Date: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("Logging", LoggingSchema);
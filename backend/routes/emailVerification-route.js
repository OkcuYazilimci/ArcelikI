import express from "express";
import { verifyEmail } from "../middleware/emailVerification.js";
import { authorizeEmail } from "../middleware/authToken.js";

const emailRouter = express.Router();

emailRouter.get("/emailToken", authorizeEmail, verifyEmail);

export default emailRouter;
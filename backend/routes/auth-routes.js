import { express } from "express";
import { createToken, authorizateToken } from "../middleware/authToken.js";

const authRouter = express.Router();

authRouter.post("/create-token", createToken);
authRouter.post("/authorize-token", authorizateToken);

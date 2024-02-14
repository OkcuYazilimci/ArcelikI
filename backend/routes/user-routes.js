import  express from "express";
import  {getAllUser, signup, login, 
getAllUserAdmin, getUserById} from "../controllers/user-controller.js"
import { authorizeCookie } from "../middleware/authToken.js";

const router = express.Router();
//all of the request will be contained here
router.get("/getAll", getAllUser);
router.get("/getAllAdmin", getAllUserAdmin);
router.get("/getById", authorizeCookie, getUserById)
router.post("/signup", signup);
router.post("/login", login);
export default router;
import  express from "express";
import  {getAllUser, signup, login, 
getAllUserAdmin, getUserById, logout, myProfile} from "../controllers/user-controller.js"
import { authorizeCookie } from "../middleware/authToken.js";

const router = express.Router();
//all of the request will be contained here
router.get("/getAll", getAllUser);
router.get("/getAllAdmin", getAllUserAdmin);
router.get("/getById", authorizeCookie, getUserById);
router.get("/:id", authorizeCookie, myProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
export default router;
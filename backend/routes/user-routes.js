import  express from "express";
import  {getAllUser, signup, login, 
getAllUserAdmin} from "../controllers/user-controller.js"

const router = express.Router();
//all of the request will be contained here
router.get("/getAll", getAllUser);
router.get("/getAllAdmin", getAllUserAdmin);
router.post("/signup", signup);
router.post("/login", login);
export default router;
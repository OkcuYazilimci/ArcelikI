import express  from "express";
import { upload } from "../middleware/multer.js";
import { authorizeCookie } from "../middleware/authToken.js";
import { addBlog, getAllBlogs, updateBlog, getById, deleteBlog, getAllAdmin, searchBlog, getWithId } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/getAll", authorizeCookie, getAllBlogs);
blogRouter.get("/getAllAdmin", getAllAdmin);
blogRouter.get("/search", searchBlog);
blogRouter.get("/getById", authorizeCookie, getById); //api-blog/:id (this end-point will be connect with Collection)
blogRouter.get("/:id", authorizeCookie, getWithId);
blogRouter.post("/add", authorizeCookie, upload, addBlog); // api-blog/add
blogRouter.put('/:id', updateBlog); // api-blog/:id (Update button in Collection)
blogRouter.delete("/:id", deleteBlog); //api-blog/:id (In Collection page there will be delete button near posts)
export default blogRouter;

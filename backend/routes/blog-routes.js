import express  from "express";
import { upload } from "../middleware/multer.js";
import {authorizateCookie} from "../middleware/authToken.js";

import { addBlog, getAllBlogs, updateBlog, getById, deleteBlog, getAllAdmin } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
    res.render("login", {
        layout: "login"
    })
})
blogRouter.get("/getAll", getAllBlogs);
blogRouter.get("/getAllAdmin", getAllAdmin);
blogRouter.post("/add", authorizateCookie, upload, addBlog); // api-blog/add
blogRouter.put('/:id', updateBlog); // api-blog/:id (Update button in Collection)
blogRouter.get("/:id", getById); //api-blog/:id (this end-point will be connect with Collection)
blogRouter.delete("/:id", deleteBlog); //api-blog/:id (In Collection page there will be delete button near posts)
export default blogRouter;

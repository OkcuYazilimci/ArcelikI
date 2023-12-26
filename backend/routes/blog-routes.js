import express  from "express";
import { addBlog, getAllBlogs, updateBlog, getById, deleteBlog } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
    res.render("login", {
        layout: "login"
    })
})
blogRouter.get("/getAll", getAllBlogs);
blogRouter.post("/add", addBlog); // api-blog/add
blogRouter.put('/:id', updateBlog); // api-blog/:id (Update button in Collection)
blogRouter.get("/:id", getById); //api-blog/:id (this end-point will be connect with Collection)
blogRouter.delete("/:id", deleteBlog); //api-blog/:id (In Collection page there will be delete button near posts)
export default blogRouter;

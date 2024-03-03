import {Router} from "express";
import {createBlog, deleteBlog, editBlog, getBlogById, getBlogs, getUserBlogs} from "../controllers/BlogController.js";
import {verifyToken} from "../middleware/verifyAccess.js";

const router = Router()

router.post("/",verifyToken,createBlog)
router.get("/",verifyToken,getBlogs)
router.get("/:id",verifyToken,getBlogById)
router.put("/:id",verifyToken,editBlog)
router.delete("/:id",verifyToken,deleteBlog)
router.get("/user/blogs",verifyToken,getUserBlogs)

export default router;
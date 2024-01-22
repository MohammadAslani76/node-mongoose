import {Router} from "express";
import {createBlog} from "../controllers/BlogController.js";

const router = Router()

router.post("/",createBlog)

export default router;
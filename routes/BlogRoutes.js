import {Router} from "express";
import {createBlog} from "../controllers/BlogController.js";
import {verifyToken} from "../middleware/verifyAccess.js";

const router = Router()

router.post("/",verifyToken,createBlog)

export default router;
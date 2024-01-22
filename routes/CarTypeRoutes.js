import {Router} from "express";
import {verifyToken} from "../middleware/verifyAccess.js";
import {
    createCarType,
    deleteCarType,
    getCarTypeById,
    getCarTypes,
    updateCarType
} from "../controllers/CarTypeController.js";

const router = Router()

router.get("/",verifyToken,getCarTypes)
router.get("/:id",verifyToken,getCarTypeById)
router.post("/",verifyToken,createCarType)
router.put("/",verifyToken,updateCarType)
router.delete("/:id",verifyToken,deleteCarType)

export default router;
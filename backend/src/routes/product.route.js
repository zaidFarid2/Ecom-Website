import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProduct } from "../controller/admin.controller.js";
import { getProductById,updateProduct } from "../controller/product.controller.js";


const router  = Router()

router.get("/",protectRoute,getAllProduct)
router.get("/:id",protectRoute,getProductById)

// gemini adding
router.put("/:id",protectRoute,updateProduct)



export default router
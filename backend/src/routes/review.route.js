import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createReview, deleteReview } from "../controller/revire.controller.js";



const router = Router()

router.get("/",protectRoute,createReview)
router.delete("/:reviewId",protectRoute,deleteReview)

export default router
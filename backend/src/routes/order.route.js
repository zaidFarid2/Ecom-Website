import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrder, getUserOrder } from "../controller/order.controller.js";

const router = Router()


router.post("/",protectRoute,createOrder)
router.get("/",protectRoute,getUserOrder)



export default router
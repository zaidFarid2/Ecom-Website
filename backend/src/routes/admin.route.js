import { Router } from "express";
import { createProduct, getAllCustomers, getAllOrders, getAllProduct, getDashboardStats, updateOrderStatus, updateProduct } from "../controller/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/mutler.middleware.js";

const router = Router()

//optimization 
router.use(protectRoute,adminOnly)
router.post("/products",upload.array("images",3),createProduct)
router.get("/products",getAllProduct)
router.put("/products:id",upload.array("images",3), updateProduct)


router.get("/orders",getAllOrders)
router.patch("/orders/:orderId/status",updateOrderStatus)


router.get("/customer",getAllCustomers)
router.get("/stats",getDashboardStats)




//Put for entrire resource update and Patch for specific entity
export default router
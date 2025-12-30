import { Router } from "express";
import  { addAddress,addToWishlist, deleteAddress, getAddress, getWishlist, removeFromWishlist, updateAddress } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router()



//address routes
router.use(protectRoute)

router.post("/addresses",addAddress)
router.get("/addresses",getAddress)
router.put("/addresses/:AddressId",updateAddress)
router.delete("/addresses/:AddressId",deleteAddress)

//wishlist Routes

router.post("/wishlist",addToWishlist)
router.delete("/wishlist/:productId",removeFromWishlist)
router.get("/wishlist",getWishlist)



export default router
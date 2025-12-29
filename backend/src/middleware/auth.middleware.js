import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protectRoute = [
    requireAuth(),
    asyncHandler( async (req,res,next)=>{
        try {
            const clerkId = req.auth().userId
            if(!clerkId) return res.status(404).json({message:"Unauthorized - Invalid Token"})
            const user = await User.findOne({clerkId})
            if(!user) return res.status(404).json({message:"User not found"})
            req.user = user
            next()
        } catch (error) {
            console.error("Error in protectedRoute middleware",error)
            res.status(500).json({message:"Internal server Issue"})
        }

    } )
]



export const  adminOnly  = async(req,res,next)=>{
    if(!req.user) {
        return res.status(404).json({message:"Unathorized -  User not found"})
    }

    if(req.user.email != ENV.ADMIN_EMAIL){
        return res.status(403).json({message:"Forbidden- admin access only"})
    }
    next()
}   
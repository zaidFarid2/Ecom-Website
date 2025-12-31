import { Product } from "../models/prouduct.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProductById  = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const product  = await Product.findById(id)
        if(!product) return res.status(400).json({message:"Product not found"})
    } 
    catch (error) {
        console.error("Error in getting product by id Controller", error);
        throw new apiError(500, "Internal Server Error");            
    }
} )
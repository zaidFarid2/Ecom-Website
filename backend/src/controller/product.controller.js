import { Product } from "../models/prouduct.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProductById  = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params
        const product  = await Product.findById(id)
        if(!product) return res.status(400).json({message:"Product not found"})
        return res.status(200).json({ success: true, product });
    } 
    catch (error) {
        console.error("Error in getting product by id Controller", error);
        throw new apiError(500, "Internal Server Error");            
    }
} )


export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product: updatedProduct });
});
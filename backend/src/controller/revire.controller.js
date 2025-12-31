import { asyncHandler } from "../utils/asyncHandler.js";
import {Order} from "../models/order.model.js"
import {Review} from "../models/review.model.js"
import { Product } from "../models/prouduct.model.js";

export const createReview = asyncHandler( async (req,res)=>{
    try {
        const {productId,orderId,rating} = req.body        
        if(!rating|| rating<1||rating>5){
            return res.status(400).json({error:"Rating must be between 1 and 5 "})
        }
        const user = req.user

        //verify order exist ordelivered
        const orderExist = await Order.findById(orderId)
        
        if(!orderExist) return res.status(400).json({error:"Order not found"})
            if(orderExist.status !==  "delivered") return res.status(400).json({error:"Can only review delivered order"})
                const productInOrder = orderExist.orderItem.find(
            (item)=> item.product.toString() === productId.toString() 
            
        )
        if(!productInOrder) return res.status(400).json({error:"Product not found in Order"})
            
            //chck existing review
            const existingReview = await Review.findOne({productId,userId:user._id})
        if(!existingReview) return res.status(400).json({error:"You have already reviwed this product"})
        const review = await Review.create({
            productId,
            userId:user_id,
            rating,
            orderId
            
        })
        // update product review in db
        const product = await Product.findById(productId)
        const reviews = await Review.findById({productId})
        const totalRating  = review.reduce((sum,rev)=>sum+ rev.rating,0 )    
        product.averageRating = totalRating/ reviews.length 
        product.totalReview = reviews.length
        await product.save()  
        res.status(201).json({ message: "Review created successfully",review });

    } 
    catch (error) {
        console.error("Error in create review Controller", error);
        throw new apiError(500, "Internal Server Error");
        
    }
})
export const deleteReview = asyncHandler( async (req,res)=>{
    try {
       const {reviewId} = req.params
       const user = req.user
       const review = await Review.findById(reviewId)
        if(!review) return res.status(404).json({error:"review not found"})
        if(review.reviewId.toString() !== user._id.toString() ) return res.status(403).json({error:"Not authorized to delete this review"})
        const productId= review.productId
        await Review.findByIdAndDelete(reviewId)

        
        const product = await Product.findById(productId)
        
        const totalRating  = review.reduce((sum,rev)=>sum+ rev.rating,0 )    
        
        await Product.findByIdAndUpdate( productId, { 
        averageRating:review.length>0? totalRating/review.length:0,
        totalReview:review.length,
       })


        await product.save()
        res.status(201).json({ message: "Review Delete successfully" });

    }
    
    catch (error) {
        console.error("Error in delete review Controller", error);
        throw new apiError(500, "Internal Server Error");
        
    }
})
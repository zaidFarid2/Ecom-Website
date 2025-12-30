import { asyncHandler } from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js"
import {Product} from "../models/prouduct.model.js"
import {Order} from "../models/order.model.js"
import {Review} from "../models/review.model.js"
import { set } from "mongoose";

export const createOrder = asyncHandler( async(req,res)=>{
    try {
        const user = req.user       
        const {orderItems,shippingAddress,paymentResult,totalPrice} = req.body
        if(!orderItems||orderItems.length === 0 ){
            res.status(400).json({error:"No order items"})
        }
        // validation of stock nd product
        for( const  item of orderItems){
            const product = await Product.findById(item.product._id)
            if(!product){
                return res.status(400).json({error:`product ${item.name} not found`})
            }
            if(product.stock < item.quantity){
                return res.status(400).json({error:`insuffiecient for  ${item.name}`})

            }
        }
        const order  = await Order.create({
            user:user._id,
            cler_id:user.cler_id,
            orderItems,
            shippingAddress,
            paymentResult,
            totalPrice
        })

        //update product stock like decreament the stock count

        for (const item of orderItems){
            await  Product.findByIdAndUpdate(item.product._id,{
                $inc:{stock: -item.quantity},
            })
        }

        res.status(201).json({ message: "Order created successfully",order });

    } 
    catch (error) {
        console.error("Error in create Order Controller", error);
        throw new apiError(500, "Internal Server Error");
        
    }
})
export const getUserOrder = asyncHandler( async(req,res)=>{
    try {
      
        const order = await Order.findById(req.user.cler_id).populate("orderItems.product").sort({createdAt:-1})
      
        //chck each order is reviewed
        const orderId = order.map( (order)=>order._id )
        const review = await Review.find({orderId:{ $in :order._id} })
        const reviewOrderId = new set(review.map( (review) => review.orderId.toString() ))
        const orderWithReviewStatus = await Promise.all(
            order.map( async(order)=> {
            const review = await Review.findOne({orderId:order._id })
                return{
                ...order.toObject(),
                hasReviewed:reviewOrderId.has(order._id.toString()),
            }
            
        })
      )
    res.status(200).json({orders:orderWithReviewStatus})
        
      

    } 
    catch (error) {
        console.error("Error in create Order Controller", error);
        throw new apiError(500, "Internal Server Error");
    }
        
})  
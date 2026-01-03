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
export const getUserOrder = asyncHandler(async (req, res) => {
    try {

        const orders = await Order.find({ cler_id: req.user.cler_id })
            .populate("orderItems.product")
            .sort({ createdAt: -1 });


        if (!orders || orders.length === 0) {
            return res.status(200).json({ orders: [] });
        }


        const orderIds = orders.map((o) => o._id);
        const reviews = await Review.find({ orderId: { $in: orderIds } });
        
        // 3. Set ka 'S' hamesha Capital hota hai
        const reviewedOrderIdsSet = new Set(reviews.map((r) => r.orderId.toString()));

        // 4. Promise.all ke saath 'new' keyword nahi lagta
        const orderWithReviewStatus = orders.map((order) => {
            return {
                ...order.toObject(),
                hasReviewed: reviewedOrderIdsSet.has(order._id.toString()),
            };
        });

        res.status(200).json({ orders: orderWithReviewStatus });

    } catch (error) {
        console.error("Error in getUserOrder Controller", error);

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
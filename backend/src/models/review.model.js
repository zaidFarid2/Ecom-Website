import mongoose from "mongoose";
import { Product } from "./prouduct.model.js";
import { User } from "./user.model.js";
import { Order } from "./order.model.js";

const reviewSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5,
        default:0,
    },
},{timestamps:true})


export const review = mongoose.model("Reviews",reviewSchema) 
import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Product } from "./prouduct.model.js";

const cartItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
        default:1,
    }
},{timestamps:true})

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    clerId:{
        type:String,
        required:true,
        unique:true
    },
    cart:[cartItemSchema]

},{timestamps:true})


export const Cart = mongoose.model("Carts",cartSchema)
import mongoose from "mongoose";
import { User } from "./user.model.js";
import { Product } from "./prouduct.model.js";

const orderItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
},{timestamps:true})

const shippingAddressSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zipcode:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    
    state:{
        type:String,
        required:true
    },

},{timestamps:true})

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItem:[orderItemSchema],
    
    shippingAddress:{
        type:shippingAddressSchema,
        required:true
    },

    paymentResult:{
        id:String,
        status:String,
    },
    totalPrice:{
        type:Number,
        required:true,
        min:0,
    },
    status:{
        type:String,
        enum:["pending","delivered","shipped"],
        default:"pending",
    },
    shippedAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    },


},{timestamps:true})


export const Order = mongoose.model("Orders",orderSchema)
import { asyncHandler } from "../utils/asyncHandler.js"
import apiError from "../utils/apiError.js"
import cloudinary from "../config/cloudinary.js"
import {Product} from "../models/prouduct.model.js"
import {Order} from "../models/order.model.js"
import { User } from "../models/user.model.js"

// Products
    export const createProduct = asyncHandler( async()=>{
try {
        const {name,description,price,stock,category } = req.body   
        if(!name|| !description || !price || !stock || !category ){
            throw new apiError(400,"All Field are Required")
        }
        if(!req.files || req.files.length === 0 ){
            throw new apiError(400,"At leat one file required")
        }
        
        if(req.files.length>0){
            throw new apiError(400,"Max three image allowed")
    
        }
        const uploadPrmoise = req.files.map((file)=>{
            return cloudinary.uploader.upload(file.path,{
                folder:"products"
            })
        })
    
    const uploadResult = await Promise.all(uploadPrmoise)
    const imageUrl = uploadResult.map((result)=>result.secure_url)
    
    const product = await Product.create({
        name,
        description,
        price:parseFloat(price),
        stock:parseInt(stock), //problem!!!
        images:imageUrl,

    })
    res.status(201).json({product})

    } 
catch (error) {
    console.error("Error creating product",error)
    throw new apiError(500,"Internal Server Error")
    }

} )

export const getAllProduct = asyncHandler( async(_,res)=>{
    try {
        const products = await Product.find().sort({createdAt:-1})    
        res.status(200).json({products})
} 
    catch (error) {
        throw new apiError(500,"Internal server Issue") 
}
} )

export const updateProduct = asyncHandler( async(req,res)=>{
    try {
        const {id} = req.params
        const {name,description,price,stock,category } = req.body 
        const product  = Product.findById(id)
        if(!product){
            throw new apiError(404,"product not found") 
        
        }
        // products details update
        if(name) product.name = name
        if(description) product.description = description
        if(category) product.category = category
        if(price !== "undefined") product.price = parseFloat(price)
        if(stock !== "undefined") product.stock = parseInt(stock)
        
        
        //handle image  file if upload again
        if(!req || req.files.length === 0 ){
            if(req.files.length>0){
            throw new apiError(400,"Max three image allowed")
    
        }
    
        const uploadPrmoise = req.files.map((file)=>{
            return cloudinary.uploader.upload(file.path,{
                folder:"products"
            })
        })      
    
    const uploadResult = await Promise.all(uploadPrmoise)
    product.images = uploadResult.map((result)=>result.secure_url)
        }
        
        await product.save()
        res.status(200).json({product})
} 
    catch (error) {
            throw new apiError(500,"Internal server Issue") 
     
    }
} )


// Orders
export const  getAllOrders = asyncHandler( async(_,res)=>{
try {
    const orders =  await Order.find()
    .populate("user","name email")
    .populate("orderItem.product")
    .sort({createdAt:-1})    
    res.status(200).json({orders})
} 
catch (error) {
    console.error("Error while getAllOrders controller",error)
    throw new apiError(500,"Internal Server Error")

}
})

export const  updateOrderStatus = asyncHandler( async(req,res)=>{
try {
    const {orderId} = req.body
    const {status} = req.body
    if(!["pending","shipped","delivered"].includes(status)  ){
        return res.status(400).json({error:"Invalid Status"})
    }

    const order = await Order.findById(orderId)
    if(!order){
        return res.status(400).json({error:"Order not Found"})
    }
    order.status  = status
    if(order == "shipped" && !order.shippedAt ){
        order.shippedAt = new Date()
    }
    if(order == "delivered" && !order.deliveredAt ){
        order.deliveredAt = new Date()
    }
    await order.save()
    res.status(200).json({message:"order update successfully",order})

}   
catch (error) {
    console.error("Error  update OrderStatus controller",error)
    throw new apiError(500,"Internal Server Error")   
}
})  


// Customer:


export const getAllCustomers = asyncHandler( async(_,res)=>{
    try {
        const customers = await User.find().sort({createdAt:-1})
        res.status(200).json({customers})    
    } 
    catch (error) {
    console.error("Error  get Customer controller",error)
    throw new apiError(500,"Internal Server Error")   
        
    }
})

export const getDashboardStats = asyncHandler( async(_,res)=>{
    try {
        const totalOders = await Order.countDocuments()
        const revenueResult = await Order.aggregate([
            {
                $group:{
                    _id: null,
                    total:{ $sum: "totalPrice"  }    
                }
            },
        ])
        const totalRevenue = revenueResult[0]?.total || 0 
        const totaluser = await User.countDocuments()
        const totalProducts = await User.countDocuments()

        res.status(200).json({
            totalRevenue,
            totalProducts,
            totaluser,
            totalOders,

        })
        
    } 
    catch (error) {
    console.error("Error  get Customer dashboard controller",error)
    throw new apiError(500,"Internal Server Error")  
    }
})
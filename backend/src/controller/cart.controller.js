import { asyncHandler } from "../utils/asyncHandler.js";
import {Cart} from "../models/cart.model.js"
import { Product } from "../models/prouduct.model.js";
import ApiError from "../utils/apiError.js";
 
export const getCart =  asyncHandler(async(req,res)=>{
    try{
      let cart  = await Cart.findOne({clerId:req.user.clerId}).populate("items.product")
      if(!cart){
        user = req.user
        cart = await Cart.create({
            user:user._id,
            clerkId:user.clerId,
            items:[]
        })
      }
      res.status(201).json({cart})  


    } catch (error) {
        console.error("Error in getting cart Controller", error);
        throw new ApiError(500, "Internal Server Error");           
    }
})

export const addToCart =  asyncHandler(async(req,res)=>{
    try {
        const {productId,quantity = 1} = req.body

        
        // validate product exist and stock
        const product = await Product.findById(productId)
        if(!product){
            return res.status(400).json({error:`product ${item.name} not found`})
        }
        if(product.stock < item.quantity){
            return res.status(400).json({error:`insuffiecient for  ${item.name}`})

        }

        let cart  = await Cart.findOne({clerId:req.user.clerId}).populate("items.product")
        if(!cart){
        user = req.user
        cart = await Cart.create({
            user:user._id,
            clerkId:user.clerId,
            items:[]
        })
      }
    //   check if item is already exist in cart nd if item exist increament the count 
        const existingItem = cart.items.find( (item)=> item.product.toString()== productId) 
        if(existingItem){
            // item increament
            const itemIncrement = existingItem.quantity +1

            if(product.stock< itemIncrement){
                return res.status(400).json({error:`insufficient Stock `})
            }
            existingItem.quantity = itemIncrement
        }
        else{
                // add new item
                cart.items.push({product:productId,quantity})       
        }
                 
        await cart.save()
        res.status(200).json({message:"Item added to cart",cart})
} 
    catch (error) {
        console.error("Error in add to Cart Controller", error);
        throw new apiError(500, "Internal Server Error");          
    }
})


export const updateCartItem =  asyncHandler(async(req,res)=>{
    try {
        const {productId}= req.params
        const quantity = req.body
        if(quantity<0){
            return res.status(400).json({error:"Quantity must be at least 1"})
        }
        
        let cart  = await Cart.findOne({clerId:req.user.clerId}).populate("items.product")
        if(!cart){
            return res.status(404).json({error:"Cart not found"})

        }
        const itemIndex = cart.items.findIndex( (item)=> item.product.toString()== productId) 
        if(itemIndex==-1){
            return res.status(404).json({error:"Item  not found in cart"})
        }
        // product exist and validate stock
        const product = await Product.findById(productId)
        if(!product){
            return res.status(400).json({error:`product ${item.name} not found`})
        }
        if(product.stock< quantity){
            return res.status(404).json({error:`insufficient Stock `})
        }
        cart.items[itemIndex].quantity = quantity
        await cart.save()
        res.status(200).json({message:"Cart updated  succesfully",cart})

    } catch (error) {
        console.error("Error in update Cart Controller", error);
        throw new apiError(500, "Internal Server Error");        
    }

})
export const removeFromCart =  asyncHandler(async(req,res)=>{
    try {
        const {productId} = req.params
        const cart  = await Cart.findOne({clerId:req.user.clerId}).populate("items.product")
        if(!cart){
            return res.status(404).json({error:"Cart not found"})
        }
        cart.items.filter( (item)=> item.product.toString() !== productId )
        await cart.save()
        res.status(200).json({message:"Item removed from Cart",cart})

    } catch (error) {
        console.error("Error in update Cart Controller", error);
        throw new apiError(500, "Internal Server Error");            
    }
})

export const  clearCart =  asyncHandler(async(req,res)=>{
    try {
        const cart  = await Cart.findOne({clerId:req.user.clerId}).populate("items.product")
        if(!cart){
            return res.status(404).json({error:"Cart not found"})
        }
        cart.items = []
        await cart.save()
    } catch (error) {
        console.error("Error in romove Cart Controller", error);
        throw new apiError(500, "Internal Server Error");      
    }
})
import { asyncHandler } from "../utils/asyncHandler.js";
import  apiError  from "../utils/apiError.js";
import { User } from "../models/user.model.js";


// about address
export  const addAddress =  asyncHandler(async (req, res) => {
    try {
        const { label, fullname, streetAddress, city, state, zipCode, phoneNumber, isDefault } = req.body;
        const user = req.user;

        if( !fullname|| !streetAddress|| !city|| !state|| !zipCode){
            return res.status(400).json({eroor:"Missing required addresss field"})
        }

        //if this set (as default) all other are unset  
        if (isDefault) {
            user.addresses.forEach((addr) => {
                addr.isDefault = false;

            });

        }
        user.addresses.push({
            label,
            fullname,
            streetAddress,
            city,
            state,
            zipCode,
            phoneNumber
        });
        await user.save();
        res.status(200).json({ message: "addresses added successfully", address: user.addresses });
    }
    catch (error) {
        console.error("Error in add address Controller", error);
        throw new apiError(500, "Internal Server Error");

    }

});

export const getAddress= asyncHandler( async(req,res)=>{
    try {
        const user  = req.user
        res.status(200).json({address:user.addresses})    
    }
    catch (error) {
        console.error("Error in get address Controller",error)
        throw new apiError(500,"Internal Server Error")        
        
    }    
})

export const updateAddress = asyncHandler( async(req,res)=>{
    try {
        const { label,fullName,streetAddress,city,state,zipCode,phoneNumber,isDefault  } = req.body    
        const {addressId} = req.params

        const user = req.user
        const address = user.addresses.id(addressId)
        if(!address){
            return res.status(404).json({error:"address not found"})
        }
        if(isDefault){
            user.addAddress.forEach( (addr)=>{
                addr.isDefault  = false
            })
        }
        address.label = label || address.label 
        address.fullName = fullName || address.fullName 
        address.streetAddress = streetAddress || address.streetAddress 
        address.city = city || address.city 
        address.state = state || address.state 
        address.phoneNumber = phoneNumber || address.phoneNumber 
        address.isDefault = isDefault !== undefined ?  isDefault :address.isDefault  



        await user.save()
        res.status(200).json({message:"address update successfuly",addresses:user.addresses})


    } 
    catch (error) {
    console.error("Error in update address Controller",error)
    throw new apiError(500,"Internal Server Error")          
    }



})

export const deleteAddress = asyncHandler( async(req,res)=>{
    try {
        const {addressId} = req.params    
        const user = req.user
        user.addAddresses.pull(addressId)
        await user.save()
        res.status(200).json({message:"address delete successfuly",addresses:user.addresses})
            

    } 
    catch (error) {
    console.error("Error in delete address Controller",error)
    throw new apiError(500,"Internal Server Error")    
    }

})



// wishlist
export const addToWishlist = asyncHandler( async(req,res)=>{
    try {
        const {productId} = req.body
        const user  = req.user
        //chck product in wishlist ?
        if(user.wishlist.includes(productId)){
            return res.status(400).json({error:"product is laready in wishlisht"})
        }
        user.wishlist.push(productId)
        await user.save()
        res.status(200).json({message:"Product added to wishlist",wishlist:user.wishlist})





    } 
    catch (error) {
    console.error("Error in add to wishlist Controller",error)
    throw new apiError(500,"Internal Server Error")
    }



})

export const getWishlist = asyncHandler( async(req,res)=>{
    try {
        //using populate bcz whishlisht is array with the help of populate we can get whole product info 
            const user = await User.findById(req.user._id).populate("wishlist")
        res.status(200).json({wishlist:user?.wishlist})     
    } 
    catch (error) {
    console.error("Error in get wishlist Controller",error)
    throw new apiError(500,"Internal Server Error")
    }
})

export const removeFromWishlist = asyncHandler( async(req,res)=>{
        try {
        const {productId}= req.params
        const user= req.user
        user.wishlist.pull(productId)
        // if product is not in wishlist nd u want to remove it 
        if(user.wishlist.includes(productId)){
            return res.state(400).json({error:"Product is not evene in wishlist!!"})
        }
        await user.save()
    } 
    catch (error) {
    console.error("Error in  delete wishlist Controller",error)
    throw new apiError(500,"Internal Server Error")    
        
    }
})

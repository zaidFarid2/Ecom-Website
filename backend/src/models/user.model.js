import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({ 
    label:{
        type:String,
        requied:true,

    },
    fullname:{
        type:String,
        requied:true
    },
    streetAsdress:{
        type:String,
        requied:true
    },
    city:{
        type:String,
        requied:true
    },
    zipCode:{
        type:Number,
        requied:true
    },
    phoneNumber:{
        type:Number,
        requied:true
    },
    isDefault:{
        type:Boolean,
        default:false
    }
},{timestamps:true}) 
    
const userScehma =  new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        default:""
    },
    clerkId:{
        type:String,
        unique:true,
        required:true
    },
    addresses:[addressSchema],
    whishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]

},{timestamps:true})



export const User = mongoose.model("User",userScehma)
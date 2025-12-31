import mongoose from "mongoose"
import { ENV } from "./env.js"

export const DBconnnection = async()=>{
   try {
    const  connectionInstance = await mongoose.connect(`${ENV.DB_URI}`)
    console.log(`Connected to DB! DB host :${connectionInstance.connection.host}`)
 
   } catch (error) {
    console.log(`ye Q nh ara dalla ${ENV.DB_URI}`)
    console.log({message:"DB connection Failed",error})
    process.exit(1)        
   }
} 
import { User } from "../models/user.model.js";
import {Inngest} from "inngest"
import {DBconnnection} from "./db.js"
export const  inngest = new Inngest({id: "ecommerce-app"})

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},

    async ({event})=>{
        
        await DBconnnection()
        
        const {id,email_addresses,first_name,last_name,image_url} = event.data 
        const newUser = {
            clerkId: id,
            name: `${first_name || ""}${last_name|| ""}`,
            imageUrl:image_url,
            email:email_addresses[0]?.email_address ,
            addresses:[],
            whishlist:[],
        }
    
        await User.created(newUser)
    }
)

const deleteUserFromDB = inngest.createFunction(
    {id:"delete-user-from-DB"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        await DBconnnection()
        const{id} = event.data
        await User.deleteOne({clerkId:id})

    }
)



export const functions = [syncUser,deleteUserFromDB] 
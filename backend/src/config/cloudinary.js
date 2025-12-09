import {v2 as cloudinary} from "cloudinary"
import { ENV } from "./env.js"


cloudinary.config({
    cloud_name:ENV.CLOUDINAR_API_NAME,
    api_key: ENV.CLOUDINAR_API_KEY,
    api_secret:ENV.CLERK_SECRET_KEY,
})
export default cloudinary

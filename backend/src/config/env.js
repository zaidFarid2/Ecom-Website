import dotenv  from "dotenv"
dotenv.config({quiet:true})
export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY : process.env.CLERK_SECRET_KEY,
    CLOUDINAR_API_KEY:process.env.CLOUDINAR_API_KEY,
    CLOUDINAR_API_SECRET:process.env.CLOUDINAR_API_SECRET,
    CLOUDINAR_API_NAME:process.env.CLOUDINAR_API_NAME,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
}
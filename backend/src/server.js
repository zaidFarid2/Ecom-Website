import express from "express";
import path from "path";
import { clerkMiddleware } from '@clerk/express'
//import serve method from inngestExpress and functions which is wriiten in inngest.js
import {serve}  from "inngest/express"
import { inngest,functions } from "./config/inggest.js";
import cors from "cors"

import { ENV } from "./config/env.js";
import { DBconnnection } from "./config/db.js";

import adminroutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import orderRoutes from "./routes/order.route.js"
import reviewRoutes from "./routes/review.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"

const app = express();  
const __dirname = path.resolve();

app.use("/", (req, res) => res.send("aho"));
app.use(express.json())
app.use(clerkMiddleware()) //auth object under the req 
app.use(cors({origin:"http://localhost:5173",credentials:true})) //credentials allows browser to  send the cookies to the server with request   
app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
});

app.use("/api/admin",adminroutes)   
app.use("/api/user",userRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/review",reviewRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)

        


    if (ENV.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../admin/dist")));

        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
        });
    }
const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("app is run")
        DBconnnection()
    });

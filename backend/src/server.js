import express from "express";
import path from "path";
import { clerkMiddleware } from '@clerk/express'
//import serve method from inngestExpress and functions which is wriiten in inngest.js
import {serve}  from "inngest/express"
import { inngest,functions } from "./config/inggest.js";

import { ENV } from "./config/env.js";
import { DBconnnection } from "./config/db.js";

import adminroutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import orderRoutes from "./routes/order.route.js"
import reviewRoutes from "./routes/review.route.js"
import productRoutes from "./routes/product.route.js"

const app = express();  
const __dirname = path.resolve();

app.use(express.json())

app.use(clerkMiddleware()) //auth object under the req 
app.get("/api/inngest",serve({client:inngest,functions}))
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
});

app.get("/api/admin",adminroutes)
app.get("/api/user",userRoutes)
app.get("/api/order",orderRoutes)
app.get("/api/review",orderRoutes)
app.get("/api/product",orderRoutes)

        


    if (ENV.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../admin/dist")));

        app.get("/{*any}", (req, res) => {
            res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
        });
    }
const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("app is run")
        DBconnnection()
    });

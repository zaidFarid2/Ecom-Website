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

// 1. Middlewares (Inhe upar hi rehne dein)
app.use(express.json());
app.use(clerkMiddleware()); 
app.use(cors({origin:"http://localhost:5173",credentials:true}));

// 2. Inngest Route (Isay upar rakhein taake koi aur route ise block na kare)
app.use("/api/inngest", serve({ client: inngest, functions }));

// 3. Health Check
app.use("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
});

// 4. API Routes
app.use("/api/admin", adminroutes);   
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

// 5. Default/Home Route (AGAR zaroorat hai toh isay niche rakhein)
app.get("/", (req, res) => res.send("Server is running!"));

// 6. Static Files (Production)
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

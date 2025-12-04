import express from "express"

const app  = express()

app.get("/api/health",(req,res)=>{
    res.status(200).json({message:"Success"})
    changes
})

app.listen( 3000 , ()=>console.log("app is run"))   
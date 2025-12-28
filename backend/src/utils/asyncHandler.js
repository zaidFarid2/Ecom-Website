const asyncHandler = (requestHandler)=>(req,res,next)=>{
    return Promise()
    .resolve(requestHandler(req,res,next))
    .reject(
        (error)=>{
            next(error)
        })
}



export {asyncHandler}
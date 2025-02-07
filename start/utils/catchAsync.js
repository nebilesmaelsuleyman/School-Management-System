const catchasync=(fn)=>(req,res,next)=>{
    promise.resolve(req,res,next).catch((error)=>{
        next(error)
    })
}
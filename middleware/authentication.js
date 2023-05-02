
const jwt=require("jsonwebtoken")

const authentices=(req,res,next)=>{

    const token=req.headers?.authorization
    console.log(token)
    if(token)
    {
        const decoded=jwt.verify(token,"dheeraj")
        if(decoded)
        {
            console.log(decoded)
            
            req.body.author=decoded.author_id
            console.log(req.body)
            next()
        }
    }else{
        res.send({"err":"pleas login first"})
    }
    
}
module.exports={authentices}
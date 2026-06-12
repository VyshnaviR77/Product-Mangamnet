const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware");
    // console.log(req.headers);
    
    const token=req.headers["authorization"].split(" ")[1]
    console.log(token);  
    
    if(token){
        try{
            const jwtRespone = jwt.verify(token, process.env.jwt_password)
            console.log(jwtRespone); 
            req.payload=jwtRespone.UserEmail
            
            next()
        }
        catch(err){
            res.status(404).json("authorisation failed..",err)
        }

    }
    else{
        res.status(401).json("authorisation failed... token is missing")
    }
    
}
module.exports=jwtMiddleware
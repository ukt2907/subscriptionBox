import userModel from "../models/userModel.js";
export const authenticationToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: "token missing"
        })
    }

    try{
        const payload = await userModel.checkToken(token);
        if(!payload){
            return res.status(401).json({
            message: "invalid token"
        })}
        req.user = payload;
        next();

    }catch (error) {
        res.status(401).json({
            message: "invalid token"
        })
    }
}

export const adminMiddleware = async (req,res, next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        return res.status(403).json({message: "not authorized as admin"})
    }
    
}
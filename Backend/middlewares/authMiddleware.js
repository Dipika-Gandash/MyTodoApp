import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({message : "No token, authorization denied"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret")
        req.user = decoded;
        next();

    } catch(error){
        return res.status(401).json({message : "Invalid or expired token"})
    }
}

export default authMiddleware;
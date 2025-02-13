const jwt = require('jsonwebtoken')
const User = require("../models/User")

 const protect = async(req,res,next)=>{
    let token;
    console.log("Protect middle ware data",req.headers);
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } 
    else if (req.headers.token) {
        token = req.headers.token;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
}

 const adminOnly = (req,res,next)=>{
    if (req.user && req.user.role === "admin") {
        next();
      } else {
        res.status(403).json({ message: "Admin access only" });
      }
}

module.exports ={
    protect,
    adminOnly
}
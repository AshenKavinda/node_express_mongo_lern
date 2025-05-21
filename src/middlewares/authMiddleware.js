import { verifyToken } from "../utils/jwtUtils.js";

export const authenticate = (req , res , next) => {
    const token = req.header('Authorization')?.replace('Bearer ','');
    if(!token) return res.status(404).json({error: 'Access denied. No token provided.'});

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({error:'invlid token.'});
    }
};

export const authorize = (roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({error: 'Forbidden. Insufficient permissions.'});
        }
        next();
    }
}


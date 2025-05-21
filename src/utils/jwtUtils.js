import jwt from 'jsonwebtoken';

const generateToken = (userID,role) => {
    return jwt.sign(
        {userID,role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.EXPIRES_IN}
    );
};

const verifyToken = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET);
}

export {generateToken,verifyToken};
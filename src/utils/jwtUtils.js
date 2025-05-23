import jwt from 'jsonwebtoken';

export const generateTokens = (userID,role) => {
    const accessToken = jwt.sign(
        {userID,role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.ACCESS_EXPIRES_IN}
    );

    const refreshToken = jwt.sign(
        {userID},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_EXPIRES_IN}
    );

    return {accessToken,refreshToken};

};

export const verifyAccessToken = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET);
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
}
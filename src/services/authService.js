import bcrypt from 'bcrypt';
import { generateTokens , verifyRefreshToken } from "../utils/jwtUtils.js";
import User from "../models/user.js";

export const loginUser = async(email,password) => {
    const user = await User.findOne({email});
    if(!user) throw new Error("Incorrect email or password.");
    
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) throw new Error("Incorrect email or password.");

    const { accessToken , refreshToken } = generateTokens(user.userID,user.role);
    
    user.refreshTokens.push({token:refreshToken,expiresAt: new Date(Date.now()+7*24*60*60*1000)});
    await user.save(); 

    return {userID:user.userID,accessToken,refreshToken};
};

export const refreshAccessToken = async(refreshToken) => {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findOne({userID:decoded.userID});
    console.log(refreshToken);
    if (!user?.refreshTokens?.some(t => t.token === refreshToken)) {
        throw new Error("Invalied refresh token");
    }

    const {accessToken} = generateTokens(user.userID,user.role);

    return accessToken;
};

export const logoutUser = async(refreshToken) => {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findOne({userID:decoded.userID});
    if (!user) return;

    user.refreshTokens = [];
    await user.save();
};
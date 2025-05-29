import bcrypt from 'bcrypt';
import { generateTokens , verifyRefreshToken } from "../utils/jwtUtils.js";
import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import { sendVarificationEmail,sendFogotPasswordEmail } from '../utils/emailSender.js';
import { ApiError } from '../utils/ApiError.js';

export const loginUser = async(email,password) => {
    const user = await User.findOne({email});
    if(!user) throw new ApiError(400, "Incorrect email or password.");
    
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) throw new ApiError(400, "Incorrect email or password.");
    if (!user.isVerified) {
        const token = uuidv4();
        const emailTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        user.emailToken = token;
        user.emailTokenExpires = emailTokenExpires;

        await user.save();

        await sendVarificationEmail(user.email,token);

        throw new ApiError(400,"email not verifid.please check your email and verify");
    }

    const { accessToken , refreshToken } = generateTokens(user.userID,user.role);
    
    user.refreshTokens.push({token:refreshToken,expiresAt: new Date(Date.now()+7*24*60*60*1000)});
    await user.save(); 

    return {userID:user.userID,accessToken,refreshToken};
};

export const loginWithGoogle = async(email) => {
    const user = await User.findOne({email});
    const { refreshToken , accessToken } = generateTokens(user.userID,user.role);
    user.refreshTokens.push({token:refreshToken,expiresAt: new Date(Date.now()+7*24*60*60*1000)});
    await user.save(); 
    return {userID:user.userID,accessToken,refreshToken};
}

export const refreshAccessToken = async(refreshToken) => {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findOne({userID:decoded.userID});
    if (!user?.refreshTokens?.some(t => t.token === refreshToken)) {
        throw new ApiError(400,"Invalied refresh token");
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

export const sendFogotPasswordLink = async(email) => {
    const token = uuidv4();
    const user = await User.findOne({email});
    user.emailToken = token;
    user.emailTokenExpires = new Date(Date.now() + 1000*60*60*24);

    await sendFogotPasswordEmail(email,token);

    user.save();
}
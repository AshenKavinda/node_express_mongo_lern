import * as userService from '../services/userService.js';
import { publicCreateUserSchema, loginSchema,validateEmail,resetPassword as validateResetPassword } from '../middlewares/userSchema.js';
import * as authService from '../services/authService.js';
import bcrypt from 'bcrypt';

export const register = async(req,res,next) => {
    try {
        const {error} = publicCreateUserSchema.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const reponse = await userService.createUser({...req.body,role:'user'}); 
        if (typeof reponse === 'string') {
            return res.status(400).json({error: reponse});
        }
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}

export const verifyEmail = async(req,res,next) => {
    try {
        const {token} = req.query;

        const user = await userService.verifyEmail(token);
        if(!user) return res.status(400).json({ error: 'Invalid or expired token' });

        user.isVerified = true;
        user.emailToken = undefined;
        user.emailTokenExpires = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        next(error);
    }
}

export const login = async(req,res,next) => {
    try {
        const {error} = loginSchema.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const reponse = await authService.loginUser(req.body.email,req.body.password);

        if (typeof reponse === 'string') {
            return res.status(400).json({error: reponse});
        }

        res.cookie('refreshToken', reponse.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  
            maxAge: 7 * 24 * 60 * 60 * 1000  
        });

        res.json(reponse);
    } catch (error) {
        next(error);
    }
}

export const refreshAccessToken = async(req,res,next) => {
    try {
        const {refreshToken} = req.cookies;
        if (!refreshToken) return res.status(400).json({error: "No refresh token provided"});
        const accessToken = await authService.refreshAccessToken(refreshToken);
        res.json({accessToken});
    } catch (error) {
        next(error);
    }
}

export const logout = async(req,res,next) => {
    try {
        const {refreshToken} = req.cookies;
        if (!refreshToken) return res.status(400).json({error: "No refresh token provided"});

        await authService.logoutUser(refreshToken);
        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
}

export const sendFogotPasswordLink = async(req,res,next) => {
    try {
        const {error} = validateEmail.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});
        const {email} = req.body;
        const user = await userService.findByEmail(email);
        if(!user) return res.status(404).json({error: "User Not Found."});
        await authService.sendFogotPasswordLink(email);

        res.json({ message: 'Verification link sened to your email.' });
    } catch (error) {
        next(error);
    }
}

export const resetPassword = async(req,res,next) => {
    try {
        const {error} = validateResetPassword.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});
        const {password,token} = req.body;
        const user = await userService.verifyEmail(token);
        if(!user) return res.status(400).json({ error: 'Invalid or expired token' }); 

        user.password = await bcrypt.hash(password,10);

        user.emailToken = undefined;
        user.emailTokenExpires = undefined;

        user.save();

        res.json({message: "Password reset successfully."});
    } catch (error) {
        next(error);
    }
}

import * as userService from '../services/userService.js';
import { publicCreateUserSchema, loginSchema } from '../middlewares/userSchema.js';
import * as authService from '../services/authService.js';

export const register = async(req,res,next) => {
    try {
        const {error} = publicCreateUserSchema.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const isExist = await userService.findByEmail(req.body.email);
        if(isExist) return res.status(400).json({error: 'The email is alredy exist'});

        const newUser = await userService.createUser({...req.body,role:'user'});        
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}

export const login = async(req,res,next) => {
    try {
        const {error} = loginSchema.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const verified = await authService.loginUser(req.body.email,req.body.password);

        res.cookie('refreshToken', verified.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // HTTPS-only
            maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        });

        res.json(verified);
    } catch (error) {
        next(error);
    }
}

export const refreshAccessToken = async(req,res,next) => {
    try {
        console.log(req.cookies);
        const {refreshToken} = req.cookies;
        if (!refreshToken) return res.status(400).json({error: "No refresh token provided"});

        console.log(refreshToken);

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

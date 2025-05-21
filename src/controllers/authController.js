import * as userService from '../services/userService.js';
import { generateToken } from '../utils/jwtUtils.js';
import bcrypt from 'bcrypt';
import { publicCreateUserSchema, loginSchema } from '../middlewares/userSchema.js';

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

        const user = await userService.findByEmail(req.body.email);
        if(!user) return res.status(400).json({error: "incorrect email or password."});

        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if (!isMatch) return res.status(400).json({error: "incorrect email or password."});

        const jwtToken = await generateToken(user.userID,user.role);

        res.json({userID:user.userID,token:jwtToken});
    } catch (error) {
        next(error);
    }
}

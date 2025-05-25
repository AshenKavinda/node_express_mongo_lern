import * as userService from "../services/userService.js";
import { privateCreateUserSchema , updateUserSchema } from "../middlewares/userSchema.js";

export const createUser = async(req, res , next) => {
    try {
        const {error} = privateCreateUserSchema.validate(req.body);
        if (error) return res.status(400).json({error: error.details[0].message});
        const isExist = await userService.findByEmail(req.body.email);
        if (isExist) return res.status(400).json({error: "Email alrady exist."});
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      q: search = '',
      sort = '-createdAt'
    } = req.query;

    const result = await userService.getUsers({ 
      page: parseInt(page), 
      limit: parseInt(limit), 
      search,
      sort 
    });
    
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getUser = async(req,res,next) => {
    try {
        const user = await userService.getUserByID(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found!'});
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async(req,res,next) => {
    try {
        const {error} = updateUserSchema.validate(req.body);
        if(error) return res.status(400).json({error: error.details[0].message});

        const user = await userService.updateUser(req.params.id,req.body);
        if(!user) return res.status(404).json({error: 'User not found!'});
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) return res.status(404).json({error: 'user not found!'});
        res.json({message:"user deleted successfully"});
    } catch (error) {
        next(error);
    }
}
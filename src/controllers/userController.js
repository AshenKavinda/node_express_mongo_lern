import * as userService from "../services/userService.js";

export const createUser = async(req, res , next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const getUsers = async(req,res,next) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

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
        const user = await userService.updateUser(req.params.id,req.body);
        if(!user) return res.status(404).json({error: 'User not found!'});
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next) => {
    try {
        const deletedUser = userService.deleteUser(req.params.id);
        if (!deleteUser) return res.status(404).json({error: 'user not found!'});
        res.json({message:"user deleted successfully"});
    } catch (error) {
        next(error);
    }
}
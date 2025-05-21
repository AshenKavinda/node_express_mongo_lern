import User from "../models/user.js";

export const createUser = async(userData) => {
    const user = new User(userData);
    return await user.save();
}

export const getUsers = async() => {
    return await User.find();
}

export const getUserByID = async(id) => {
    return await User.findOne({userID:id});
}

export const updateUser = async(userID,userData) => {
    return await User.findOneAndUpdate({userID},userData,{new:true});
}

export const deleteUser = async(userID) => {
    return await User.findOneAndDelete({userID});
}
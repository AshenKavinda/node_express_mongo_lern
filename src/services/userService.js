import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const createUser = async(userData) => {

    const {password,...rest} = userData;
    const hashPassword = await bcrypt.hash(password,10);

    const user = new User({...rest,password:hashPassword});
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

export const findByEmail = async(email) => {
    const user = await User.findOne({email});
    return user;
}
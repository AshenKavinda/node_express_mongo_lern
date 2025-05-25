import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sendVarificationEmail } from "../utils/emailSender.js";

export const createUser = async(userData) => {

    const {password,...rest} = userData;
    const hashPassword = await bcrypt.hash(password,10);

    const unverifiedUser = await User.findOne({email:userData.email,isVerified:false});
    if (unverifiedUser) return "Email is not verifid plese login and verify email.";

    const existingUser = await User.findOne({email:userData.email});
    if (existingUser) return "Email is alredy exist.Plese use another email";

    const token = uuidv4();
    const emailTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await sendVarificationEmail(userData.email,token);

    const user = new User({...rest,password:hashPassword,emailToken:token,emailTokenExpires});
    return await user.save();
}

export const getUsers = async ({ 
  page = 1, 
  limit = 10, 
  search = '',
  sort = '-createdAt' 
}) => {
  const skip = (page - 1) * limit;

  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const [users, total] = await Promise.all([
    User.find(query)
    .select('-password -__v -_id -refreshTokens -createdAt')
    .sort(sort)
    .skip(skip)
    .limit(limit),
    User.countDocuments(query)
  ]);

  return {
    data: users,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
  };
};

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

export const verifyEmail = async(token) => {
    const user = await User.findOne({ 
        emailToken: token,
        emailTokenExpires: { $gt: new Date() },
    });

    return user;
}
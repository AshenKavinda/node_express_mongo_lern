import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const userSchema = new mongoose.Schema({
    userID : {
        type: String,
        unique:true,
        default: () => uuidv4()
    },
    name : {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        min:18
    },
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'user'
    }
},{timestamps:true});

export default mongoose.model('User', userSchema);
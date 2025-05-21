import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected.");
    } catch (err) {
        console.error("DB connect error: "+err);
        process.exit(1);
    }
}

export default connectDB;
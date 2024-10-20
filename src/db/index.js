import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({
    path: './env'
})
const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/chaicode?retryWrites=true&w=majority`);
        console.log(`\n MongoDB Connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1)
    }
}

export default connectToDB;
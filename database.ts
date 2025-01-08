import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URL: any = process.env.MONGODB_URL

const dbConnection = () => {
    mongoose.connect(MONGODB_URL).then(() => {
        console.log('Mongodb connect!');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

export default dbConnection;
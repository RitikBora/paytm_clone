import mongoose from "mongoose";
import { config } from 'dotenv';

let dbConnected = false;

export const connectToDatabase = async () => {
  if (!dbConnected) {
    config();

    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const dbUrl = `mongodb+srv://${username}:${password}@projects.icbkpjd.mongodb.net/paytm`;
    // const dbUrl = 'mongodb://127.0.0.1:27017/courseapp'; // for local testing

    try {
      await mongoose.connect(dbUrl, {
      });

      console.log('Connected to MongoDB');
      dbConnected = true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }
};

export default connectToDatabase;

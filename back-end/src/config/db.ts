import mongoose from "mongoose";

const URI = process.env.DB_URI || 'mongodb://localhost:27017/mydatabase'

export async function connectDatabase() {
    try {
        await mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
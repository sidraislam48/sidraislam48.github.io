import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// MongoDB connection
const dbURI = process.env.DB_URI; // Read DB_URI from environment variables

if (!dbURI) {
    console.error('DB_URI is not defined in the environment variables.');
    process.exit(1); // Exit the application if DB_URI is not defined
}

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI); // Removed deprecated options
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

connectDB(); // Connect to MongoDB

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
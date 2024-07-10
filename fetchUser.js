import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/userModel.js'; // Adjust the path as necessary

// Load environment variables from .env file
dotenv.config();

const getUser = async () => {
  let retries = 3; // Number of retry attempts

  while (retries > 0) {
    try {
      // Connect to MongoDB
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      });

      console.log('Connected to MongoDB');

      // Find user by ID
      console.log('Fetching user...');
      const user = await User.findById('66812483de436f9c6cc914e3');
      if (user) {
        console.log('User found:', user); // Log the user object
        break; // Exit loop if user is found
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
      console.error('Error stack trace:', error.stack);
      retries--; // Decrement retry count
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
    } finally {
      // Close the Mongoose connection
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
      }
    }
  }

  if (retries === 0) {
    console.error('Failed to fetch user after multiple attempts');
  }
};

// Call the function to fetch user
getUser();

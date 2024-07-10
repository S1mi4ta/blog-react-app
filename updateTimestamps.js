import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/models/userModel.js'; // Adjust the path if necessary

dotenv.config();

const updateTimestamps = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    console.log('Fetching users...');
    const users = await User.find();
    console.log(`Found ${users.length} users`);

    for (const user of users) {
      let updated = false;

      if (!user.createdAt) {
        user.createdAt = new Date();
        updated = true;
      }

      if (!user.updatedAt) {
        user.updatedAt = new Date();
        updated = true;
      }

      if (updated) {
        console.log(`Updating timestamps for user: ${user._id}`);
        await user.save();
      }
    }

    console.log('Timestamps updated for all users');
    process.exit();
  } catch (error) {
    console.error('Error updating timestamps', error);
    process.exit(1);
  }
};

updateTimestamps();

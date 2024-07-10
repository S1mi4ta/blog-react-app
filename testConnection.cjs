// Load dotenv and configure
require('dotenv').config();

console.log('Starting test connection script...');
console.log('Environment variables loaded:');
console.log(process.env);

const { MONGO_URI } = process.env;
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined. Please check your .env file.');
    process.exit(1); // Exit the script with an error
}

// Proceed with MongoDB connection or any other logic using MONGO_URI

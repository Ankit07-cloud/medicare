const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medicare';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Local MongoDB connection failed (${error.message}). Initializing In-Memory Database...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected at ${uri}`);
    } catch (memErr) {
      console.error(`MongoDB In-Memory Server Error: ${memErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;

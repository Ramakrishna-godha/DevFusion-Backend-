// const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect(process.env.DB_CONNECTION_SECRET);
// };

// module.exports = connectDB;
require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.DB_CONNECTION_SECRET;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;

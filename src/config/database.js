// const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect(process.env.DB_CONNECTION_SECRET);
// };

// module.exports = connectDB;
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;

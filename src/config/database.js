// const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect(process.env.DB_CONNECTION_SECRET);
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const dbURI = process.env.DB_CONNECTION_SECRET;
const connectDB = async () => {
  await mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};
module.exports = connectDB;

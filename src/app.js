const express = require("express");
const connectDB = require("./config/database");

const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const profileRouter = require("./router/profile");
const authRouter = require("./router/auth");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

// app.options("*", cors());

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin

  credentials: true, // Allow cookies if needed
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Data base connection establishes....");
    app.listen(3000, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.error("Data base cannot be connected!!");
  });

const express = require("express");

const authRouter = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

const { validateSignUpData } = require("../utils/validation");

// Sign Up

authRouter.post("/signup", async (req, res) => {
  try {
    // validating the data
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      about,
      age,
      gender,
      skills,
      photoUrl,
    } = req.body;

    // Encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new  instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      about,
      age,
      gender,
      photoUrl,
      skills,

      password: passwordHash,
    });

    const savedUser = await user.save();
    // Create a JWT Token
    const token = await savedUser.getJWT();

    // Add the token to the cookie and send the response back to the user

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added Successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();

      // Add the token to the cookie and send the response back to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

// Logout

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("LoggedOut successful");
});

module.exports = authRouter;

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // const cookies = req.cookies
    // const {token} =cookies
    const { token } = req.cookies;

    if (!token) {
      // throw new Error("token is not valid...!!!");
      return res.status(401).json({ error: "Authentication required" });
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  userAuth,
};

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

// profileRouter.put("/profile/edit", userAuth, async (req, res) => {
//   try {
//     if (!validateEditProfileData(req)) {
//       throw new Error("Invalid edit Request..!!");
//     }

//     const loggedInUser = req.user;

//     Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

//     await loggedInUser.save();

//     // res.send(`${loggedInUser.firstName},Profile Updated Successful...!!`);

//     res.json({
//       message: `${loggedInUser.firstName},Profile Updated Successful...!!`,
//       data: loggedInUser,
//     });
//   } catch (error) {
//     // res.status("ERROR" + error.message);
//     res.status(400).json({ error: error.message });
//   }
// });

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    if (!validateEditProfileData(req)) {
      return res.status(400).json({ error: "Invalid edit request" });
    }

    const loggedInUser = req.user;

    // Object.keys(req.body).forEach((key) => {
    //   if (loggedInUser[key] !== undefined) {
    //     loggedInUser[key] = req.body[key];
    //   }
    // });

    Object.keys(req.body).forEach((key) => {
      if (key === "skills" && Array.isArray(req.body.skills)) {
        loggedInUser.skills = req.body.skills; // Update skills
      } else if (loggedInUser[key] !== undefined) {
        loggedInUser[key] = req.body[key];
      }
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Profile Updated Successfully!`,
      data: loggedInUser, // Return the updated user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// profileRouter.put("/profile/edit", async (req, res) => {
//   try {
//     // Validate the incoming request payload
//     if (!validateEditProfileData(req)) {
//       return res.status(400).json({ error: "Invalid fields in request" });
//     }

//     // Update user in the database

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id, // Assuming `req.user._id` contains the authenticated user's ID
//       {
//         $set: {
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           photoUrl: req.body.photoUrl,
//           age: req.body.age, // Ensure `age` is correctly passed
//           gender: req.body.gender, // Ensure `gender` is valid
//           about: req.body.about,
//         },
//       },
//       { new: true, runValidators: true } // Return the updated document and validate inputs
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Respond with the updated user data
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = profileRouter;

const Profile = require("../models/Profile");
const router = require("express").Router();
const User = require("../models/User");

router.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await User.updateOne({ _id: id }, { $set: body });

    res.status(200).json({
      message: `User successfully updated`,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findByIdAndDelete(id);
    if (!findUser) {
      throw new Error(`This user does not exist`);
    } else {
      res.status(200).json({
        message: `User has been deleted`,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: error.message,
    });
  }
});

router.post("/createprofile", async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    newProfile.save;
    res.status(201).json({ newProfile });
  } catch (error) {
    console.log(error);
  }
});

router.put("updateProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProfile = await Profile.updateOne({ _id: id }, { $set: body });

    res.status(200).json({
      message: `profile successfully updated`,
      updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.delete("/deleteProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findProfile = await Profile.findByIdAndDelete(id);
    if (!findProfile) {
      throw new Error(`This Profile does not exist`);
    } else {
      res.status(200).json({
        message: `profile has been deleted`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundProfile = await Profile.find({
      _ID: id,
    });
    if (!foundProfile) {
      throw new Error(`Profile not found`);
    } else {
      res.status(200).json({
        message: `profile found`,
        foundProfile,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;

const Profile = require("../models/Profile");
const router = require("express").Router();
const User = require("../models/Users");
const Portfolio = required("../models/Portfolio");
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
    newProfile.save();
    res.status(201).json({ newProfile });
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateProfile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedProfile = await Profile.updateOne(
      { userId: id },
      { $set: body }
    );

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
    const findProfile = await Profile.findOneAndDelete({ userId: id });
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
      userId: id,
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

router.get("/Portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundPortfolio = await Portfolio.find({
      userId: id,
    });
    if (!foundPortfolio) {
      throw new Error(`Portfolio not found`);
    } else {
      res.status(200).json({
        message: `portfolio found`,
        foundPortfolio,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post("/createPortfolio", async (req, res) => {
  try {
    const newPortfolio = new Portfolio(req.body);
    newPortfolio.save();
    res.status(201).json({ newPortfolio: newPortfolio });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteimage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findPortfolio = await Portfolio.findByIdAndDelete(id);
    if (!findPortfolio) {
      throw new Error(`This image does not exist`);
    } else {
      res.status(200).json({
        message: `image has been deleted`,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: error.message,
    });
  }
});

router.put("/updateimage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedImage = await Portfolio.updateOne({ _id: id }, { $set: body });

    res.status(200).json({
      message: `Image successfully updated`,
      updatedImage: updatedImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;

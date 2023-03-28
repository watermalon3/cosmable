const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = Number(process.env.SALT);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const slugify = require("slugify");

router.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const { userName, email, password, name, title, practiceName, zipCode, occupation, profilePicture } = req.body;
    if ((!userName, !email, !password, !name, !title, !practiceName, !zipCode, !occupation, !profilePicture )) {
      res.status(406).json({
        message: "Invalid",
      });
      throw new Error("The user has provided undefined schema values");
    }
    const userSlug = slugify(name, { lower: true });
    const profileUrl = `http://cosmable.com/profile/${userSlug}`;
    const newUser = new User({
      userName,
      email,
      password: bcrypt.hashSync(password, SALT),
      name,
      title,
      practiceName,
      zipCode,
      occupation,
      profilePicture,
      profileUrl
    });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User successfully created",
      newUser,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: `${err}`,
    });
  }
});

router.post("/login", async (req, res) => {
  console.log("login route hit");
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      res.status(404).json({
        message: "User Not Found",
        foundUser,
      });
    } else {
      const verifyPwd = await bcrypt.compare(password, foundUser.password);

      if (verifyPwd) {
        const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET_KEY, {
          expiresIn: "24h",
        });

        res.res.redirect(`/profile/${userSlug}`),
        foundUser,
        token
      } else {
        res.status(403).json({
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
});

module.exports = router;

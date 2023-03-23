const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = Number(process.env.SALT);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if ((!userName, !email, !password)) {
      res.status(406).json({
        message: "Invalid",
      });
      throw new Error("The user has provided undefined schema values");
    }
    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password, SALT),
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
    const { userName, password } = req.body;

    const foundUser = await userName.findOne({ userName });

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

        res.status(200).json({
          message: "User Logged In",
          foundUser,
          token,
        });
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

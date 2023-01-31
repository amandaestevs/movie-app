const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists. Please login.");
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  const userData = { name, email, password: hashedPassword };
  const user = new User(userData);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email.toLowerCase();
  try {
    const user = await User.findOne({ email });
    if (user == null) return res.status(200).json("User not found");
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) return res.status(200).json("Incorrect password");

    if (user != null && correctPassword) {
      const userId = user._id;
      const token = jwt.sign({ email, userId }, process.env.JWT_KEY, {
        expiresIn: "5h",
      });
      return res.status(200).json({ token, userId });
    }

    return res.status(200).json("Invalid Credentials");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/verify", (req, res) => {
  const token = req.cookies["access_token"];

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        if (decoded) {
          res.status(200).send("valid");
        }
        res.status(400).json(err);
      });
    }

    if (!token) return res.status(200).json("No token");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

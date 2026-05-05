const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Send response
    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
    try{
        
  const username = 'admin';
  const password = 'admin123';

  const existingUser = await User.findOne({ username:"admin" });

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPassword });
  res.json({ message: "User registered successfully" });

  } catch( error) {
    return res.status(500).json({ message: "Server error" });
  }
};
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, uid, displayPicture } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = new User({ name, email, uid, displayPicture });
      await newUser.save();
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ user: newUser, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// login from this server is not needed so we will return userData and jswon token

exports.loginUser = async (req, res) => {
  try {
    const { name, email, uid, displayPicture, google } = req.body;
    const user = await User.findOne({ email });
    if (google && !user) {
      const newUser = new User({ name, email, uid, displayPicture });
      await newUser.save();
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ user: newUser, token });
    }
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ user, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

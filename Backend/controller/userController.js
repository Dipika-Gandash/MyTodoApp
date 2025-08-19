import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required..." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();

    const token = generateTokenAndSetCookie(newUser, res);

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateTokenAndSetCookie(user, res);

    return res.status(200).json({
      message: "Login successfully",
      user: { userName: user.userName, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const profile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, no user data" });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Please login to view profile" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, no user data" });
    }

    const userId = req.user.id;

    const { userName, email } = req.body;
    if (!userName && !email) {
      return res.status(400).json({ message: "Please provide data to update" });
    }

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        userName: updatedUser.userName,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.clearCookie("token");
    return res.status(200).json({
      message: "Password updated successfully. Please login again.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

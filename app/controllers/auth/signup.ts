import {
  generateAccessToken,
  generateRefreshToken,
  TOKENS_EXPIRY,
} from "../../lib/constants/auth";
import { RouteController } from "../../lib/types/general";
import { User } from "../../models";

export const signup: RouteController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, address, phoneNumber, role } =
      req.body;

    // Validate the input
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Incomplete user information",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      role: role === "admin" ? "admin" : "customer",
    });
    await user.save();

    // generate access and refresh tokens for the new user
    const accessToken = generateAccessToken(
      user._id as string,
      user.email,
      user.firstName,
      user.lastName
    );

    const refreshToken = generateRefreshToken(user._id as string);

    // Set the tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: TOKENS_EXPIRY.ACCESS, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: TOKENS_EXPIRY.REFRESH, // 30 days
    });
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }, // user details without password
      message: "User created successfully",
    });
  } catch (err: any) {
    console.error("Error signing up: ", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Signup failed",
    });
  }
};

import { RouteController } from "../../../lib/types/general";
import {
  generateAccessToken,
  generateRefreshToken,
  TOKENS_EXPIRY,
} from "../../../lib/constants/auth";
import { User } from "../../../models/userModel";

export const login: RouteController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: TOKENS_EXPIRY.ACCESS, // 15 minutes
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: TOKENS_EXPIRY.REFRESH, // 30 days
      });

      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err: any) {
    console.error("Error logging in: ", err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: "Log in failed",
    });
  }
};

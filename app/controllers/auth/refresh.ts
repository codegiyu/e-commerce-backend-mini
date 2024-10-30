import { RouteController } from "../../lib/types/general";
import jwt from "jsonwebtoken";
import { User } from "../../models";
import {
  generateAccessToken,
  setCookie,
  TOKENS_EXPIRY,
} from "../../lib/constants/auth";

export const refreshAccessToken: RouteController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(
      user._id as string,
      user.email,
      user.firstName,
      user.lastName
    );;

    // Set the new access token as a cookie
    setCookie(res, "accessToken", accessToken, TOKENS_EXPIRY.ACCESS); 
    
    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

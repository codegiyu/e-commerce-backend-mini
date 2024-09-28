import { RouteController } from "../../lib/types/general";
import jwt from "jsonwebtoken";
import { User } from "../../models/userModel";
export const getSession: RouteController = async (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        message: "Unauthenticated, no tokens",
      });
    }
    // If access token is available
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    let user = await User.findById(decoded.id).select("-password");

    // If access token is expired, check refresh token
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as {
        id: string;
      };
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthenticated, user not found" });
    }

    // If a user is found, return this response
    res.status(200).send({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      message: "User tokens valid",
    });
  } catch (err: any) {
    console.error("Error getting session: ", err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: "Getting session failed",
    });
  }
};

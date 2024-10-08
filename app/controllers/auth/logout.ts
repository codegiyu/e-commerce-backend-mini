import { RouteController } from "../../lib/types/general";

//  Log out a user by clearing the access and refresh token cookies
// @route: POST /api/users/logout
export const logoutUser: RouteController = async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    expires: new Date(0), // Set cookie expiration to clear it
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    expires: new Date(0), // Set cookie expiration to clear it
  });

  res.status(200).json({ message: "User logged out successfully" });
};

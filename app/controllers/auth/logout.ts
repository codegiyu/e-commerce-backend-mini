import { setCookie } from "../../lib/constants/auth";
import { RouteController } from "../../lib/types/general";

//  Log out a user by clearing the access and refresh token cookies
// @route: POST /api/users/logout
export const logoutUser: RouteController = async (req, res) => {
  // Clear the access and refresh tokens by setting their expiry to 0
  setCookie(res, "accessToken", "", 0);
  setCookie(res, "refreshToken", "", 0);

  res.status(200).json({ 
    success: true,
    message: "User logged out successfully" 
  });
};

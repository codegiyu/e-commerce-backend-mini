import { RouteController } from "../../lib/types/general";
import jwt from "jsonwebtoken";
import { User } from "../../models";

export const getSession: RouteController = async (req, res) => {
  try {
    const { accessToken } = req.cookies;

    // If access token is available
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    let user = await User.findById(decoded.id).select("-password");

    user
      ? res.status(200).send({
          success: true,
          data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          },
          message: "User tokens valid",
        })
      : res.status(401).json({ message: " user not found" });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: `Error getting session: ${err.message}`,
    });
  }
};

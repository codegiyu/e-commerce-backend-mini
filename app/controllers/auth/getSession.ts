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

    if (!user) return res.status(404).json({ message: " user not found" });

    res.status(200).send({
      success: true,
      data: user,
      message: "User tokens valid",
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: `Error getting session: ${err.message}`,
    });
  }
};

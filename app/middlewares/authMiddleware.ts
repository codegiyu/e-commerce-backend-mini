import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { RouteController } from "../lib/types/general";

// Protect routes
export const protect: RouteController = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user; // Only assign if user is not null
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin middleware
export const admin: RouteController = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

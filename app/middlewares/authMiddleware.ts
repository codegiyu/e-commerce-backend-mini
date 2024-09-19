import { RouteController } from "../lib/types/general";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../models/userModel";


/**
 * Middleware used to protect routes from unauthorized users
 */
const protect: RouteController = async (req, res, next) => {
  let token;

  const secret: Secret = process.env.JWT_SECRET!;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, secret) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }

      // Adjust the properties accessed from the UserDocument
      req.user = {
        _id: user._id, // Assuming _id is present in UserDocument
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
/**
 * Middleware used to protect routes from users who are not flagged as admin
 */
const admin: RouteController = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };

import { RouteController } from "../../lib/types/general";
import { User } from "../../models/userModel";


export const getAllUsers: RouteController = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    data: users,
    message: "All Users retrieved successfully",
  });
};


export const getSpecificUser: RouteController = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
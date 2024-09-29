import { RouteController } from "../lib/types/general";
import { User } from "../models/userModel";

// @desc: Get all users
// @route: GET /api/users
export const getAllUsers: RouteController = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    data: users,
    message: "All Users retrieved successfully",
  });
};

// @desc: Get specific user by ID
// @route: GET /api/users/:id
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

// @desc: Update user details
// @route: PUT /api/users/:id
export const updateUser: RouteController = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "user details updated successfully",
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc: Delete user
// @route: DELETE /api/users/:id
export const deleteUser: RouteController = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc: Log out a user by clearing the access and refresh token cookies
// @route: POST /api/users/logout
export const logoutUser: RouteController = async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Set cookie expiration to clear it
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Set cookie expiration to clear it
  });

  res.status(200).json({ message: "User logged out successfully" });
};

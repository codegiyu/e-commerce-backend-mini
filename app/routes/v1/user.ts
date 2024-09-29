import express, { Router } from "express";
import {
  getSession,
  signup,
  login,
  refreshAccessToken,
} from "../../controllers/auth";
import { admin, protect } from "../../middlewares/authMiddleware";
import {
  getAllUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
  logoutUser,
} from "../../controllers/userController";

export const router: Router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getSpecificUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, admin, deleteUser);
router.post("/logout", protect, logoutUser);

import express, { Router } from "express";
import { admin, protect } from "../../middlewares/authMiddleware";
import {
  getAllUsers,
  getSpecificUser,
  updateUser,
  deleteUser,
} from "../../controllers/user";

export const router: Router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getSpecificUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, admin, deleteUser);

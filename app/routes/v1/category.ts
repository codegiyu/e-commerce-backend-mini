import express, { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getSpecificCategory,
} from "../../controllers/category";
import { admin } from "../../middlewares/authMiddleware";
import { handleValidation } from "../../controllers/category/create";

export const router: Router = express.Router();

router.post("/create", admin, handleValidation, createCategory);
router.put("/update/:id", admin, handleValidation, updateCategory);
router.delete("/delete/:id", admin, deleteCategory);
router.get("/all", getAllCategories);
router.get("/:id", getSpecificCategory);



import express, { Router } from "express";
import {
  addProduct,
  updateProduct,
  getAllProducts,
  getSpecificProduct,
  deleteProduct,
} from "../../controllers/product";
import { validateProduct } from "../../middlewares/productValidationMiddleware";
import { admin } from "../../middlewares/authMiddleware";

export const router: Router = express.Router();

router.post("/create", addProduct);
router.put("/update/:id", admin, validateProduct, updateProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSpecificProduct);
router.delete("/delete/:id", admin, deleteProduct);

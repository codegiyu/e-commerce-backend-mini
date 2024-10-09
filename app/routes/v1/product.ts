import express, { Router } from "express";
import {
  addProduct,
  updateProduct,
  getAllProducts,
  getSpecificProduct,
  deleteProduct,
} from "../../controllers/product";
import {
  validateAddProduct,
  validateUpdateProduct,
} from "../../middlewares/productValidationMiddleware";
import { admin } from "../../middlewares/authMiddleware";

export const router: Router = express.Router();

router.post("/add", admin, validateAddProduct, addProduct);
router.put("/update/:id", admin, validateUpdateProduct, updateProduct);
router.get("/all", getAllProducts);
router.get("/:id", getSpecificProduct);
router.delete("/delete/:id", admin, deleteProduct);

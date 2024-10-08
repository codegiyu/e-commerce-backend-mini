import { body } from "express-validator";
import { RouteController } from "../../lib/types/general";
import { Category } from "../../models";

export const handleValidation = [
  body("name").trim().isEmpty().withMessage("Category name must be provided")
]

export const createCategory: RouteController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      data: savedCategory,
      message: "category created successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

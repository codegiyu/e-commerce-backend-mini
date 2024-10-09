import { body, param } from "express-validator";
import { handleValidationErrors } from "./userValidationMiddleware";
import { RouteController } from "../lib/types/general";


const ensureCategoryArray: RouteController = (req, res, next) => {
  if (!Array.isArray(req.body.category)) {
    req.body.category =
      typeof req.body.category === "undefined" ? [] : [req.body.category];
  }
  next();
};

export const validateAddProduct = [
  ensureCategoryArray,
  body("name", "Name is required").notEmpty().isString(),
  body("description", "Description is required.").notEmpty().isString(),
  body("price", "Price must be an array of numbers.")
    .isArray()
    .custom((value) => {
      if (!value.every((v: any) => typeof v === "number")) {
        throw new Error("All prices must be numbers.");
      }
      return true;
    }),
  body("countInStock", "Count in stock must be a number.").isNumeric(),
  body("category")
    .optional()
    .isArray()
    .withMessage("Category must be an array of category IDs."),
  body("size")
    .optional()
    .isArray()
    .withMessage("Size must be an array of strings."),

    handleValidationErrors,
];

export const validateUpdateProduct = [
  ensureCategoryArray,
  param("id").isMongoId().withMessage("Invalid product ID."),
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Name must be a string."),
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Description must be a string."),
  body("price")
    .optional()
    .isArray()
    .withMessage("Price must be an array of numbers.")
    .custom((value) => {
      if (!value.every((v: any) => typeof v === "number")) {
        throw new Error("All prices must be numbers.");
      }
      return true;
    }),
  body("countInStock")
    .optional()
    .isNumeric()
    .withMessage("Count in stock must be a number."),
  body("category")
    .optional()
    .isArray()
    .withMessage("Category must be an array of category IDs."),
  body("size")
    .optional()
    .isArray()
    .withMessage("Size must be an array of strings."),

    handleValidationErrors,
];

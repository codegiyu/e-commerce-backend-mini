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

// Helper function to validate ObjectId
const isValidObjectId = (value: any) => mongoose.Types.ObjectId.isValid(value);

export const validateProduct = [
  ensureCategoryArray,
  body("name", "Name is required")
    .notEmpty()
    .isString()
    .withMessage("Product name must be a string."),
  body("description", "Description is required.")
    .notEmpty()
    .isString()
    .withMessage("Product description must be a string."),
  body("price", "Product must have at least one price.")
    .isArray({ min: 1 })
    .custom((value) => value.every((price: any) => typeof price === "number"))
    .withMessage("Each price must be a number."),

  body("countInStock", "product stock count must be a number.").isNumeric(),
  body("category")
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.every(isValidObjectId);
      } else {
        return isValidObjectId(value);
      }
    })
    .withMessage("Invalid category ID(s)."),
  body("rating")
    .optional()
    .isArray()
    .withMessage("Rating must be an array.")
    .custom((value) => value.every((rating: any) => typeof rating === "number"))
    .withMessage("Each rating must be a number."),
  body("img", "Product must have at least one image.")
    .isArray({ min: 1 })
    .custom((images) => {
      return images.every(
        (image: any) =>
          image.color &&
          typeof image.color === "string" &&
          Array.isArray(image.url) &&
          image.url.every((u: any) => typeof u === "string")
      );
    })
    .withMessage(
      "Each image must have a color and an array of valid URL strings."
    ),

  body("size")
    .optional()
    .isArray()
    .withMessage("Size must be an array of strings.")
    .custom((value) => value.every((size: any) => typeof size === "string"))
    .withMessage("Each size must be a string."),
  body("tag", "Product tag is required.")
    .notEmpty()
    .isIn(["New", "Old"])
    .withMessage("Product tag must be either 'New' or 'Old'."),
  body("discount")
    .optional()
    .isNumeric()
    .withMessage("Discount must be a number."),

  handleValidationErrors,
];

import mongoose from "mongoose";

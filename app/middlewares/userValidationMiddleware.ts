import { body, validationResult } from "express-validator";
import { RouteController } from "../lib/types/general";

export const handleValidationErrors: RouteController = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateSignup = [
  body("firstName", "First name is required").notEmpty().escape(),
  body("lastName", "Last name is required").notEmpty().escape(),
  body("email", "Please provide a valid email")
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  body("phoneNumber")
    .optional()
    .isMobilePhone("en-NG")
    .withMessage("Please provide a valid Nigerian phone number")
    .escape(),
  handleValidationErrors,
];

export const validateLogin = [
  body("email", "Please provide a valid email")
    .isEmail()
    .normalizeEmail()
    .escape(),
  body("password", "Password is required").notEmpty().escape(),
  handleValidationErrors,
];

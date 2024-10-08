import { body, validationResult } from "express-validator";
import { RouteController } from "../lib/types/general";

const handleValidationErrors: RouteController = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateSignup = [
  body("firstName", "First name is required").notEmpty().escape(),
  body("lastName", "Last name is required").notEmpty().escape(),
  body("email", "Please provide a valid email").isEmail().normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phoneNumber")
    .optional()
    .isMobilePhone("en-NG")
    .withMessage("Please provide a valid Nigerian phone number"),
  handleValidationErrors,
];

export const validateLogin = [
  body("email", "Please provide a valid email").isEmail().normalizeEmail(),
  body("password", "Password is required").isEmpty(),
  handleValidationErrors,
];

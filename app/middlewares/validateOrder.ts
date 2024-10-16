import { body } from "express-validator";
import { handleValidationErrors } from "./userValidationMiddleware";

export const validateOrder = [
  body("orderItems", "Order items should be an array and contain at least 1 item")
    .isArray({ min: 1 }),
  body("orderItems.*.name", "Item name is required" ).notEmpty(),
  body("orderItems.*.qty", "Item quantity must be a number and at least 1")
    .isInt({ min: 1 }),
  body("orderItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Item price must be a positive number"),
  body("subTotal").isFloat({ min: 0 }).withMessage("Sub-total is required and must be a positive number"),
  body("shippingPrice").isFloat({ min: 0 }).withMessage("Shipping price is required and must be a positive number"),
  body("paymentMethod")
    .isIn(["cash on delivery", "Bank"])
    .withMessage("Payment method must be 'cash on delivery' or 'Bank'"),
  body("totalPrice").isFloat({ min: 0 }).withMessage("Total price is required and must be a positive number"),
  
  handleValidationErrors,
]
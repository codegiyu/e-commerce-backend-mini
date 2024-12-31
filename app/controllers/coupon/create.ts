import { body } from "express-validator";
import { RouteController } from "../../lib/types/general";
import { Coupon } from "../../models";
import { handleValidationErrors } from "../../middlewares/userValidationMiddleware";

export const handleValidation = [
  body("code").trim().isEmpty().withMessage("Coupon code must be provided"),
  body("discount", "discount must be provided")
    .notEmpty()
    .isNumeric()
    .withMessage("discount must be a number"),
  body("maxUsage", "maximum number of usage must be provided")
    .notEmpty()
    .isNumeric()
    .withMessage("maxUsage must be a number"),
  body("usageCount")
    .optional()
    .isNumeric()
    .withMessage("usageCount must be a number"),
  body("isActive", "specify if the coupon is active or not").isBoolean(),

  handleValidationErrors,
];

export const createCoupon: RouteController = async (req, res, next) => {
  try {
    const { code, discount, maxUsage, isActive } = req.body;

    const coupon = new Coupon({ code, discount, maxUsage, isActive });
    const savedCoupon = await coupon.save();

    res.status(201).json({
      success: true,
      data: savedCoupon,
      message: "coupon created successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

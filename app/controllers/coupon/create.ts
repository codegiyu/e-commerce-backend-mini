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
  body("isActive", "specify if the coupon is active or not").isBoolean(),

  handleValidationErrors,
];

export const createCoupon: RouteController = async (req, res, next) => {
  try {
    const { code, discount, isActive } = req.body;

    if (!code || !discount || !isActive) {
      res.json({ message: "provide code, discount and isActive" });
    }

    const coupon = new Coupon({ code, discount, isActive });
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

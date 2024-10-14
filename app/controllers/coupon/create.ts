import { body } from "express-validator";
import { RouteController } from "../../lib/types/general";
import { Coupon } from "../../models";

export const handleValidation = [
  body("name").trim().isEmpty().withMessage("Coupon name must be provided"),
  body("discount", "discount must be provided")
    .notEmpty()
    .isNumeric()
    .withMessage("discount must be a number"),
  body("isActive", "specify if the coupon is active or not").isBoolean(),
];

export const createCoupon: RouteController = async (req, res, next) => {
  try {
    const { name, discount, isActive } = req.body;

    if (!name || !discount || !isActive) {
      res.json({ message: "provide name, discount and isActive" });
    }

    const coupon = new Coupon({ name, discount, isActive });
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

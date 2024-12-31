import { RouteController } from "../../lib/types/general";
import { Coupon, Order } from "../../models";

export const getAllCoupons: RouteController = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json({
      success: true,
      data: coupons,
      message: "All coupons retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSpecificCoupon: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    // To list all orders that uses the coupon
    const orderHasCoupon = await Order.find({ coupon: id });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { coupon, orderHasCoupon },
      message: "Coupon retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

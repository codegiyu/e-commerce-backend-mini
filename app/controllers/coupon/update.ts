import { RouteController } from "../../lib/types/general";
import { Coupon } from "../../models";

export const updateCoupon: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCoupon,
      message: "Coupon updated successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

import { RouteController } from "../../lib/types/general";
import { Coupon } from "../../models";

export const deleteCoupon: RouteController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon)
      return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json({
      success: true,
      data: deletedCoupon,
      message: "Coupon deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

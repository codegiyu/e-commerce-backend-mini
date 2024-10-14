import { RouteController } from "../../lib/types/general";
import { Coupon } from "../../models";

export const deleteCoupon: RouteController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    
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

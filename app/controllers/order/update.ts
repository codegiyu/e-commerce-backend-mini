import { RouteController } from "../../lib/types/general";
import { Order } from "../../models";

export const updateOrderToPaid: RouteController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    const updatedOrder = await order.save();
    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Order updated to paid successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

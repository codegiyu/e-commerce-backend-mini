import { RouteController } from "../../lib/types/general";
import { Order } from "../../models";

export const getOrders: RouteController = async (req, res) => {
  try {
    const orders = await Order.find().populate(
      "user",
      "firstname lastname email"
    );
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "Orders not found",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
      message: "All orders retrieved successfully",
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSpecificOrder: RouteController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "firstname lastname email")
      .populate("coupon", "code discount");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Order received successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

export const getMyOrders: RouteController = async (req, res) => {
  try {
    // Get user from request
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

    const orders = await Order.find({ user: userId });
    res.status(200).json({
      success: true,
      data: orders,
      message: "Orders retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Server Error: ${err.message}`,
    });
  }
};

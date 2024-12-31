import { RouteController } from "../../lib/types/general";
import { validateOrder } from "../../middlewares/validateOrder";
import { Order } from "../../models";

export const createOrder: RouteController = async (req, res) => {
  const {
    orderItems,
    subTotal,
    shippingPrice,
    paymentMethod,
    totalPrice,
    coupon,
  } = req.body;

  // Validate the request
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }

   

    const newOrder = new Order({
      user: userId,
      orderItems,
      subTotal,
      shippingPrice,
      paymentMethod,
      totalPrice,
      coupon,
    });

    const createdOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      data: createdOrder,
      message: "order created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

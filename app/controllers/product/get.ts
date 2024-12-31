import { RouteController } from "../../lib/types/general";
import { Product } from "../../models";

export const getAllProducts: RouteController = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.status(200).json({
      success: true,
      data: products,
      message: "All Products retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSpecificProduct: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Product retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

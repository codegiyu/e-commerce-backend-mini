import { RouteController } from "../../lib/types/general";
import { Category, Product } from "../../models";

export const getAllCategories: RouteController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      data: categories,
      message: "All categories retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSpecificCategory: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    // To list all products that belongs to the category
    const productInCategory = await Product.find({ category: id });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { category, productInCategory },
      message: "Category retrieved successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

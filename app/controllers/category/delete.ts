import { RouteController } from "../../lib/types/general";
import { Category, Product } from "../../models";

export const deleteCategory: RouteController = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove the category from all associated products
    await Product.updateMany({ category: id }, { $pull: { category: id } });

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedCategory,
      message: "Category deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

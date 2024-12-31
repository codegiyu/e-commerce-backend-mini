import { RouteController } from "../../lib/types/general";
import { Category } from "../../models";

export const updateCategory: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

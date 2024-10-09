import { RouteController } from "../../lib/types/general";
import { Product } from "../../models";

export const updateProduct: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,            // Return the updated product document after the update
      runValidators: true,  // Ensure the updated data conforms to the schema's validation rules
    });
    

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

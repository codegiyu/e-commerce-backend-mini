import { RouteController } from "../../lib/types/general";
import { Product, Category } from "../../models";

export const updateProduct: RouteController = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    let categoryIds: any[] = [];

    // Convert category name(s) to ObjectId(s)
    if (category) {
      if (typeof category === "string") {
        const foundCategory = await Category.findOne({ name: category });
        if (!foundCategory) {
          return res
            .status(400)
            .json({ message: `Category ${category} not found` });
        }
        categoryIds.push(foundCategory._id);
        req.body.category = categoryIds;
        
      } else if (Array.isArray(category)) {
        for (const catName of category) {
          const foundCategory = await Category.findOne({ name: catName });
          if (foundCategory) {
            categoryIds.push(foundCategory._id);
          } else {
            return res
              .status(400)
              .json({ message: `Category ${catName} not found` });
          }
        }
        req.body.category = categoryIds;
      }
    }

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

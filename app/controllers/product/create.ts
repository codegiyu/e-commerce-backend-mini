import { Product, Category } from "../../models";
import { RouteController } from "../../lib/types/general";
import { validateProduct } from "../../middlewares/productValidationMiddleware";

export const addProduct: RouteController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      countInStock,
      category,
      rating,
      img,
      size,
      tag,
      discount,
    } = req.body;

    let categoryIds: any[] = [];

    // To Convert category name(s) to ObjectId(s)
    if (typeof category === "string") {
      const foundCategory = await Category.findOne({
        name: { $regex: new RegExp(category, "i") },
      });

      if (!foundCategory) {
        return res
          .status(400)
          .json({ message: `Category ${category} not found` });
      }
      categoryIds.push(foundCategory._id);
    } else if (Array.isArray(category)) {
      for (const catName of category) {
        const foundCategory = await Category.findOne({
          name: { $regex: new RegExp(catName, "i") },
        });
        if (foundCategory) {
          categoryIds.push(foundCategory._id);
        } else {
          return res
            .status(400)
            .json({ message: `Category ${catName} not found` });
        }
      }
    }
    validateProduct;
    const product = new Product({
      name,
      description,
      price,
      countInStock,
      category: categoryIds,
      rating,
      img,
      size,
      tag,
      discount,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
      message: "Product added successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

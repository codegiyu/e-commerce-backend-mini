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
    const findCategory = async (value: string) => {
      const foundCategory = await Category.findOne({
        name: { $regex: new RegExp(value, "i") },
      });

      if (!foundCategory) {
        return res.status(400).json({ message: `Category ${value} not found` });
      }

      categoryIds.push(foundCategory._id);
    };

    // To Convert category name(s) to ObjectId(s)
    if (typeof category === "string") {
      findCategory(category);
    } else if (Array.isArray(category)) {
      for (const catName of category) {
        findCategory(catName);
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

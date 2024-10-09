import { Product } from "../../models";
import { RouteController } from "../../lib/types/general";


export const addProduct: RouteController = async (req, res) => {
  try {
    const { name, description, price, countInStock, category, size } = req.body;

    const product = new Product({
      name,
      description,
      price,
      countInStock,
      category, 
      size,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
      message: "Product added successfully"
    });
  } catch (err : any) {
    res.status(400).json({ 
      success: false,
      message: err.message,
     });
  }
};

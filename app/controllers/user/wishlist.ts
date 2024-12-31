import { RouteController } from "../../lib/types/general";
import { User } from "../../models";

export const addToWishlist: RouteController = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Find the user by ID (assumed to be stored in req.user by the protect middleware)
  const user = await User.findById(req.user?._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the product is already in the wishlist
  const alreadyInWishlist = user.wishLists.find(
    (item) => item.product.toString() === productId
  );

  if (alreadyInWishlist) {
    return res
      .status(400)
      .json({ message: "Product is already in the wishlist" });
  }

  // Add the product to the wishlist
  user.wishLists.push({ product: productId });

  await user.save(); // Save the updated user document

  res.status(200).json({
    success: true,
    message: "Product added to wishlist successfully",
    wishLists: user.wishLists, // Return the updated wishlist
  });
};

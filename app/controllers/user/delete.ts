import { RouteController } from "../../lib/types/general";
import { User } from "../../models/userModel";


export const deleteUser: RouteController = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import { UserDocument } from "../lib/types/user";

// export enum roleType {
//   "customer",
//   "admin",
//   roleType.customer, roleType.admin
// }

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    role: {
      type: String,
      required: true,
      enum: ["customer", "admin"],
      default: "customer",
    },
    wishLists: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  {
    timestamps: true, // Automatically create createdAt timestamp
  }
);

/**
 * Use Bcrypt to check that an entered password matches the password of a user
 * @param enteredPassword The password that a user enters
 */
userSchema.methods.matchPassword = async function (
  this: any,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Runs before the model saves and checks to see if password has been
 * modified and hashes the password before saving to database
 */
userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<UserDocument>("User", userSchema);

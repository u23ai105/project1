import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    title: String,
    actualprice: String,
    discountedprice: String,
    quantity: String,
    bookingDate: Date,
    bookingTime: String,
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    username: { type: String, required: true, trim: true },
    phonenumber: { type: String, required: true, unique: true, trim: true },
    cart: [orderSchema],
    previousOrders: [orderSchema],
    currentOrders: [orderSchema],
    referralCode: { type: String, unique: true },
    referredBy: { type: String, default: null },
    referralEarnings: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 100 },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
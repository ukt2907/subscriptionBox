import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subscriptionPlan: {
    type: String,
    enum: ["1 Month", "3 Months", "6 Months"],
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  subscriptionDate: {
    type: Date,
    default: Date.now,
  },
  nextBillingDate: {
    type: Date,
  },
  stripeSubscriptionId: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    price: {
      type: Number,
      required: true,
      min: 0, 
    },
    image:{
        type:String
    },
    category: {
      type: String,
      required: true,
      enum: ["Basic", "Standard", "Premium"], 
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  },
  {
    timestamps: true
  }
);
const productModel = mongoose.model("Product", productSchema);
export default productModel;

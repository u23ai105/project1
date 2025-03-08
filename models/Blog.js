import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
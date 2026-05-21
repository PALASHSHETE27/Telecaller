
import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    company: String,
    campaign: String,
    source: String,
    priority: String,
    status: {
      type: String,
      enum: ["Fresh", "Contacted", "Interested", "Callback", "Closed"],
      default: "Fresh",
    },
    description: String,
    imageUrl: String, // 👈 Cloudinary URL
    lastActivityAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);

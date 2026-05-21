import mongoose from "mongoose";

const prasadamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    loggedByName: { type: String, required: true },

    donationDate: { type: Date, required: true },

    donorName: { type: String, required: true },
    mobile: { type: String, required: true },

    amount: { type: Number, required: true },

    shippingAddress: { type: String },

    receiptImage: { type: String }, // optional image upload
  },
  { timestamps: true }
);

export default mongoose.model("Prasadam", prasadamSchema);

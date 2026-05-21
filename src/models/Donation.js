import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  teleCallerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  teleCallerName: {
    type: String,
    required: true
  },
  donorName: String,
  mobile: String,
  location: String,
  donorType: String,
  amount: Number,
  paymentType: String,
  paymentMode: String,
  date: String,
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);

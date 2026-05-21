import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: String,
  status: String,
  audience: String,
  totalLeads: Number,
  calledLeads: Number,
  startDate: String,
  dueDate: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);

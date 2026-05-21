import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Issue", issueSchema);

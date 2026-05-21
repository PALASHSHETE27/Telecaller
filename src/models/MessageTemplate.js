import mongoose from "mongoose";

const messageTemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    isNew: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("MessageTemplate", messageTemplateSchema);


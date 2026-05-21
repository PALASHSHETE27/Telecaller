

// import mongoose from "mongoose";

// const activitySchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
//     type: {
//       type: String,
//       enum: ["Note", "Call", "WhatsApp", "Meeting", "Status"],
//       required: true,
//     },
//     description: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// const Activity = mongoose.model("Activity", activitySchema);
// export default Activity;







import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: false, // ✅ IMPORTANT
    },

    type: {
      type: String,
      enum: [
        "Note",
        "Call",
        "WhatsApp",
        "Meeting",
        "Status",
        "Deleted", // ✅ NEW
      ],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
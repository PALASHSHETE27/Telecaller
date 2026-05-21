// import mongoose from "mongoose";

// const dashboardStatsSchema = new mongoose.Schema(
//   {
//     freshLeads: { type: Number, default: 0 },
//     contacted: { type: Number, default: 0 },
//     interestedLeads: { type: Number, default: 0 },
//     todayIncrease: { type: Number, default: 0 }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("DashboardStats", dashboardStatsSchema);

import mongoose from "mongoose";

const dashboardStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    freshLeads: { type: Number, default: 0 },
    contacted: { type: Number, default: 0 },
    interestedLeads: { type: Number, default: 0 },
    todayIncrease: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("DashboardStats", dashboardStatsSchema);

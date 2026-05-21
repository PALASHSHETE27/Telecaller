import mongoose from "mongoose";
import dotenv from "dotenv";
import DashboardStats from "../models/DashboardStats.js";
import Activity from "../models/Activity.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await DashboardStats.deleteMany();
    await Activity.deleteMany();

    await DashboardStats.create({
      freshLeads: 42,
      contacted: 15,
      interestedLeads: 8,
      todayIncrease: 2,
    });

    await Activity.insertMany([
      { name: "John Doe", description: "No answer · Added to callback list" },
      { name: "Sarah Smith", description: "Callback scheduled · Pricing Inquiry" },
      { name: "Michael Key", description: "Deal closed · Contract sent" },
    ]);

    console.log("✅ Dashboard seed data inserted");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();

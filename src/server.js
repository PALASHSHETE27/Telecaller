
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/leadRoutes.js";
import activityRoutes from "./routes/activity.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import messageTemplateRoutes from "./routes/messageTemplateRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import prasadamRoutes from "./routes/prasadamRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/message-templates", messageTemplateRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/prasadam", prasadamRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/donors", donorRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Telecaller API running 🚀" });
});

const PORT = process.env.PORT || 7001;

// 🔥 IMPORTANT: start only after DB connects
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err);
    process.exit(1);
  });
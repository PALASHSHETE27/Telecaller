
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getDashboardStats,
  getDashboardActivities
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/activities", protect, getDashboardActivities);

export default router;


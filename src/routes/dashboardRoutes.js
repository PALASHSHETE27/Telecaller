
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

// import express from "express";
// import { getDashboardStats, getDashboardActivities } from "../controllers/dashboardController.js";
// import authMiddleware from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/stats", authMiddleware, getDashboardStats);
// router.get("/activities", authMiddleware, getDashboardActivities);

// export default router;

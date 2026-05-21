import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getSettings,
  updateSettings,
  saveFcmToken,
  reportIssue
} from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", protect, getSettings);
router.post("/update", protect, updateSettings);
router.post("/fcm", protect, saveFcmToken);
router.post("/report", protect, reportIssue);

export default router;

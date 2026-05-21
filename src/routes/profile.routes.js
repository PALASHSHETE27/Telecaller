import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, upload.single("image"), updateProfile); // ✅ image field

export default router;

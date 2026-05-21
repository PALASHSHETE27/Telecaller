
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createPrasadam,
  getMyPrasadams,
} from "../controllers/prasadamController.js";

const router = express.Router();

// ❌ NO upload middleware
router.post("/", protect, createPrasadam);
router.get("/", protect, getMyPrasadams);

export default router;

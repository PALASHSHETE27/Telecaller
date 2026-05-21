import express from "express";
import Campaign from "../models/Campaign.js";
import { protect } from "../middleware/auth.middleware.js"; // ✅ use the correct named export

const router = express.Router();

// Get all campaigns for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const data = await Campaign.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new campaign
router.post("/", protect, async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      userId: req.user.id
    });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a campaign by ID
router.delete("/:id", protect, async (req, res) => {
  try {
    await Campaign.deleteOne({ _id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import express from "express";
import Donation from "../models/Donation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE DONATION (SECURE)
router.post("/", protect, async (req, res) => {
  try {
    const {
      donorName,
      mobile,
      location,
      donorType,
      amount,
      paymentType,
      paymentMode,
      date
    } = req.body;

    const donation = await Donation.create({
      teleCallerId: req.user._id,          // 🔐 FROM TOKEN
      teleCallerName: req.user.name,       // 🔐 FROM TOKEN
      donorName,
      mobile,
      location,
      donorType,
      amount,
      paymentType,
      paymentMode,
      date
    });

    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET MY DONATIONS
router.get("/my", protect, async (req, res) => {
  const data = await Donation.find({ teleCallerId: req.user._id });
  res.json(data);
});

// ADMIN: GET ALL
router.get("/", protect, async (req, res) => {
  const data = await Donation.find();
  res.json(data);
});


// GET DONATIONS BY DONOR MOBILE (REAL HISTORY)
router.get("/donor/:mobile", protect, async (req, res) => {
  const data = await Donation.find({
    teleCallerId: req.user._id,
    mobile: req.params.mobile
  }).sort({ createdAt: -1 });

  res.json(data);
});


export default router;

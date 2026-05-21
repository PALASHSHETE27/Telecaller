import express from "express";
import Donation from "../models/Donation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * GET MY DONORS (AGGREGATED)
 */
router.get("/my", protect, async (req, res) => {
  const donors = await Donation.aggregate([
    {
      $match: { teleCallerId: req.user._id }
    },
    {
      $group: {
        _id: "$mobile",
        donorName: { $first: "$donorName" },
        mobile: { $first: "$mobile" },
        location: { $first: "$location" },
        donorType: { $first: "$donorType" },
        totalGiven: { $sum: "$amount" },
        lastDate: { $max: "$date" }
      }
    },
    { $sort: { totalGiven: -1 } }
  ]);

  res.json(donors);
});

/**
 * UPDATE DONOR (EDIT)
 */
router.put("/:mobile", protect, async (req, res) => {
  const { donorName, location, donorType } = req.body;

  await Donation.updateMany(
    { mobile: req.params.mobile },
    { donorName, location, donorType }
  );

  res.json({ message: "Donor updated successfully" });
});

export default router;

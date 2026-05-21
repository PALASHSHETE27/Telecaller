// import express from "express";
// import {
//   createActivity,
//   getLeadActivities,
// } from "../controllers/activity.controller.js";
// import { protect } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.use(protect);

// router.post("/:leadId", createActivity);
// router.get("/:leadId", getLeadActivities);

// export default router;


import express from "express";
import Activity from "../models/Activity.js";

const router = express.Router();

/* ---------------- ADD ACTIVITY (CREATE ONLY) ---------------- */
router.post("/leads/:leadId/activities", async (req, res) => {
  try {
    const { type, description } = req.body;

    const activity = await Activity.create({
      lead: req.params.leadId,
      type,
      description,
      user: req.user?._id,
    });

    res.status(201).json(activity);
  } catch (err) {
    console.error("Error adding activity:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ---------------- GET ACTIVITIES ---------------- */
router.get("/leads/:leadId/activities", async (req, res) => {
  const list = await Activity.find({ lead: req.params.leadId }).sort({
    createdAt: -1,
  });
  res.json(list);
});

export default router;

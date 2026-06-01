

import express from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  addActivity,
  getActivitiesByLead,
  deleteLead
} from "../controllers/leadController.js";

import { protect } from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.js";

const router = express.Router();

/* CREATE LEAD */
router.post(
  "/",
  protect,
  upload.single("image"),
  createLead
);

/* GET ALL LEADS */
router.get(
  "/",
  protect,
  getLeads
);

/* GET SINGLE LEAD */
router.get(
  "/:id",
  protect,
  getLeadById
);

/* UPDATE LEAD */
router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateLead
);

/* DELETE LEAD */
router.delete(
  "/:id",
  protect,
  deleteLead
);

/* ADD ACTIVITY */
router.post(
  "/:id/activities",
  protect,
  addActivity
);

/* GET ACTIVITIES */
router.get(
  "/:id/activities",
  protect,
  getActivitiesByLead
);

export default router;
import express from "express";
import MessageTemplate from "../models/MessageTemplate.js";

const router = express.Router();

// GET all templates
router.get("/", async (req, res) => {
  try {
    const templates = await MessageTemplate.find().sort({ createdAt: -1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE template
router.post("/", async (req, res) => {
  try {
    const template = await MessageTemplate.create(req.body);
    res.json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE template
router.put("/:id", async (req, res) => {
  try {
    const updated = await MessageTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

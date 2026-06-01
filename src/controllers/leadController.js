

import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";

/* CREATE LEAD */
export const createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      status,
      company,
      campaign,
      source,
      priority,
      description,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const lead = await Lead.create({
      user: userId,
      name,
      email,
      phone,
      status: status || "Fresh",
      company,
      campaign,
      source,
      priority,
      description,
      imageUrl: req.file?.path || null,
      lastActivityAt: new Date(),
    });

    await Activity.create({
      user: userId,
      lead: lead._id,
      type: "Note",
      description: "Lead created",
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (err) {
    console.error("Error creating lead:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ALL LEADS */
export const getLeads = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const { status, search, page = 1, limit = 20 } = req.query;

    const query = {
      user: userId,
    };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          phone: { $regex: search, $options: "i" },
        },
      ];
    }

    const leads = await Lead.find(query)
      .sort({ lastActivityAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: leads,
    });
  } catch (err) {
    console.error("Error fetching leads:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET SINGLE LEAD */
export const getLeadById = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const lead = await Lead.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (err) {
    console.error("Error fetching lead by ID:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* UPDATE LEAD */
export const updateLead = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const oldLead = await Lead.findById(req.params.id);

    const updateData = {
      ...req.body,
      lastActivityAt: new Date(),
    };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        user: userId,
      },
      updateData,
      {
        new: true,
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (req.body.status && oldLead.status !== req.body.status) {
      await Activity.create({
        user: userId,
        lead: lead._id,
        type: "Status",
        description: `Status changed to ${req.body.status}`,
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (err) {
    console.error("Error updating lead:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* DELETE LEAD */
export const deleteLead = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const lead = await Lead.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // ✅ CREATE DELETE ACTIVITY
    await Activity.create({
      user: userId,
      lead: lead._id,
      type: "Deleted",
      description: `${lead.name} lead deleted`,
    });

    // ✅ DELETE LEAD ONLY
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting lead:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ADD ACTIVITY TO LEAD */
export const addActivity = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const activity = await Activity.create({
      user: userId,
      lead: req.params.id,
      type: req.body.type,
      description: req.body.description || "",
    });

    await Lead.findByIdAndUpdate(req.params.id, {
      lastActivityAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (err) {
    console.error("Error adding activity:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* GET ACTIVITIES BY LEAD */
export const getActivitiesByLead = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const activities = await Activity.find({
      user: userId,
      lead: req.params.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: activities,
    });
  } catch (err) {
    console.error("Error fetching activities:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
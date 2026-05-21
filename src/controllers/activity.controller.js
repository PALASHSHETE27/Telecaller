
// import Activity from "../models/Activity.js";

// /* ---------------- CREATE ACTIVITY ---------------- */
// export const createActivity = async (req, res) => {
//   try {
//     const { type, description } = req.body;

//     const activity = await Activity.create({
//       user: req.user._id,
//       lead: req.params.leadId,
//       type,
//       description,
//     });

//     res.status(201).json({ success: true, data: activity });
//   } catch (e) {
//     console.error("CREATE ACTIVITY ERROR:", e.message);
//     res.status(400).json({
//       success: false,
//       message: e.message || "Failed to log activity",
//     });
//   }
// };

// /* ---------------- GET LEAD ACTIVITIES ---------------- */
// export const getLeadActivities = async (req, res) => {
//   try {
//     const activities = await Activity.find({
//       lead: req.params.leadId,
//       user: req.user._id,
//     }).sort({ createdAt: -1 });

//     res.json({ success: true, data: activities });
//   } catch (e) {
//     console.error("GET ACTIVITIES ERROR:", e);
//     res.status(500).json({ success: false, message: "Failed to load activities" });
//   }
// };






import Activity from "../models/Activity.js";
import Lead from "../models/Lead.js";

/* ---------------- CREATE ACTIVITY ---------------- */
export const createActivity = async (req, res) => {
  try {
    const { type, description = "" } = req.body;
    const { leadId } = req.params;

    if (!type) {
      return res.status(400).json({ success: false, message: "Type is required" });
    }

    const activity = await Activity.create({
      user: req.user._id,
      lead: leadId,
      type,
      description,
    });

    // 🔥 Auto update lead status
    let newStatus = null;
    if (type === "Call" || type === "WhatsApp") newStatus = "contacted";
    if (type === "Meeting") newStatus = "interested";

    if (newStatus) {
      await Lead.findByIdAndUpdate(leadId, { status: newStatus });
    }

    res.status(201).json({ success: true, data: activity });
  } catch (e) {
    console.error("CREATE ACTIVITY ERROR:", e);
    res.status(500).json({ success: false, message: "Failed to create activity" });
  }
};

/* ---------------- GET LEAD ACTIVITIES ---------------- */
export const getLeadActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      lead: req.params.leadId,
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: activities });
  } catch (e) {
    console.error("GET ACTIVITIES ERROR:", e);
    res.status(500).json({ success: false, message: "Failed to load activities" });
  }
};

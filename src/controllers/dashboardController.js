
import Lead from "../models/Lead.js";
import Activity from "../models/Activity.js";

/* ---------------- DASHBOARD STATS ---------------- */
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const freshLeads = await Lead.countDocuments({
      user: userId,
      status: { $regex: /^fresh$/i },
    });

    const contacted = await Lead.countDocuments({
      user: userId,
      status: { $regex: /^contacted$/i },
    });

    const interestedLeads = await Lead.countDocuments({
      user: userId,
      status: { $regex: /^interested$/i },
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayIncrease = await Lead.countDocuments({
      user: userId,
      createdAt: { $gte: todayStart },
    });

    res.json({
      success: true,
      data: {
        freshLeads,
        contacted,
        interestedLeads,
        todayIncrease,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- DASHBOARD ACTIVITIES ---------------- */
export const getDashboardActivities = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;

    const activities = await Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(7) // ✅ ONLY 7 ITEMS
      .populate("lead", "name");

    res.json({ success: true, data: activities });
  } catch (err) {
    console.error("Dashboard activities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

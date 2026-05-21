
import Prasadam from "../models/Prasadam.js";

export const createPrasadam = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;
    const telecallerName = req.user?.name || req.user?.username || "Telecaller";


    const {
      donationDate,
      donorName,
      mobile,
      amount,
      shippingAddress,
    } = req.body;

    if (!donorName || !mobile || !amount || !donationDate) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const prasadam = await Prasadam.create({
      user: userId,
      loggedByName: telecallerName,
      donationDate,
      donorName,
      mobile,
      amount,
      shippingAddress,
    });

    res.status(201).json({ success: true, data: prasadam });
  } catch (err) {
    console.error("Create prasadam error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyPrasadams = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id;
    const data = await Prasadam.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

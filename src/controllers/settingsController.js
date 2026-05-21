import Issue from "../models/Issue.js";

export const getSettings = async (req, res) => {
  res.json(req.user.settings);
};

export const updateSettings = async (req, res) => {
  req.user.settings = req.body;
  await req.user.save();
  res.json({ message: "Settings updated" });
};

export const saveFcmToken = async (req, res) => {
  req.user.fcmToken = req.body.token;
  await req.user.save();
  res.json({ message: "FCM token saved" });
};

export const reportIssue = async (req, res) => {
  await Issue.create({
    userId: req.user._id,
    message: req.body.message
  });
  res.json({ message: "Issue reported successfully" });
};

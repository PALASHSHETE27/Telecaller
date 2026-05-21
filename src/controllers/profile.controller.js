import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        employeeId: user.employeeId,
        profileImage: user.avatar || null, // ✅ map correctly
      },
    });
  } catch (e) {
    console.error("GET PROFILE ERROR:", e);
    res.status(500).json({ success: false, message: "Failed to load profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;

    if (req.file?.path) {
      user.avatar = req.file.path; // ✅ unified field
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        employeeId: user.employeeId,
        profileImage: user.avatar || null,
      },
    });
  } catch (e) {
    console.error("PROFILE UPDATE ERROR:", e);
    res.status(500).json({ success: false, message: "Profile update failed" });
  }
};

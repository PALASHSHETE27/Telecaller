
// import bcrypt from "bcryptjs";
// import crypto from "crypto";
// import User from "../models/User.js";
// import { sendEmail } from "../utils/email.js";
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// /* ================= REGISTER + OTP ================= */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(409).json({ success: false, message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       otp,
//       otpExpiry: Date.now() + 10 * 60 * 1000,
//       isVerified: false,
//     });

//     await sendEmail({
//       to: email,
//       subject: "Verify your Telecaller account",
//       html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.status(201).json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Registration failed" });
//   }
// };

// /* ================= VERIFY REGISTER OTP ================= */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     return res.json({ success: true, message: "Account verified successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "OTP verification failed" });
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     if (!user.isVerified)
//       return res.status(403).json({ success: false, message: "Please verify email first" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     // ✅ FIX: Generate BOTH tokens
//     const accessToken = generateAccessToken(user._id);
//     const refreshToken = generateRefreshToken(user._id);

//     user.refreshToken = refreshToken;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Login successful",
//       accessToken,
//       refreshToken,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// };

// /* ================= FORGOT PASSWORD → SEND OTP ================= */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     await sendEmail({
//       to: email,
//       subject: "Reset your Telecaller password",
//       html: `<h3>Your password reset OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Forgot password failed" });
//   }
// };

// /* ================= RESET PASSWORD USING OTP ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     return res.json({ success: true, message: "Password reset successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Reset password failed" });
//   }
// };





// import crypto from "crypto";
// import User from "../models/User.js";
// import { sendEmail } from "../utils/email.js";
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// /* ================= UTIL: EMPLOYEE ID ================= */
// const generateEmployeeId = async () => {
//   let employeeId;
//   let exists = true;

//   while (exists) {
//     employeeId = "EMP-" + Math.floor(100000 + Math.random() * 900000);
//     const user = await User.findOne({ employeeId });
//     if (!user) exists = false;
//   }

//   return employeeId;
// };

// /* ================= REGISTER + OTP ================= */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(409).json({ success: false, message: "User already exists" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const employeeId = await generateEmployeeId();

//     await User.create({
//       name,
//       email,
//       password, // ✅ DO NOT HASH HERE — model middleware handles it
//       employeeId,
//       otp,
//       otpExpiry: Date.now() + 10 * 60 * 1000,
//       isVerified: false,
//     });

//     await sendEmail({
//       to: email,
//       subject: "Verify your Telecaller account",
//       html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "OTP sent to email",
//     });
//   } catch (err) {
//     console.error("REGISTER ERROR:", err);
//     res.status(500).json({ success: false, message: "Registration failed" });
//   }
// };

// /* ================= VERIFY REGISTER OTP ================= */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Account verified successfully",
//     });
//   } catch (err) {
//     console.error("VERIFY OTP ERROR:", err);
//     res.status(500).json({ success: false, message: "OTP verification failed" });
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     if (!user.isVerified)
//       return res.status(403).json({ success: false, message: "Please verify email first" });

//     const isMatch = await user.comparePassword(password); // ✅ use schema method
//     if (!isMatch)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     const accessToken = generateAccessToken(user._id);
//     const refreshToken = generateRefreshToken(user._id);

//     user.refreshToken = refreshToken;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Login successful",
//       accessToken,
//       refreshToken,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         employeeId: user.employeeId,
//         avatar: user.avatar || null,
//         mobile: user.mobile || "",
//       },
//     });
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// };

// /* ================= FORGOT PASSWORD → SEND OTP ================= */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     await sendEmail({
//       to: email,
//       subject: "Reset your Telecaller password",
//       html: `<h3>Your password reset OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.json({
//       success: true,
//       message: "OTP sent to email",
//     });
//   } catch (err) {
//     console.error("FORGOT PASSWORD ERROR:", err);
//     res.status(500).json({ success: false, message: "Forgot password failed" });
//   }
// };

// /* ================= RESET PASSWORD USING OTP ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

//     user.password = newPassword; // ✅ middleware hashes it
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Password reset successful",
//     });
//   } catch (err) {
//     console.error("RESET PASSWORD ERROR:", err);
//     res.status(500).json({ success: false, message: "Reset password failed" });
//   }
// };








// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import { sendEmail } from "../utils/email.js";
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// /* ================= UTIL: EMPLOYEE ID ================= */
// const generateEmployeeId = async () => {
//   let employeeId;
//   let exists = true;

//   while (exists) {
//     employeeId = "EMP-" + Math.floor(100000 + Math.random() * 900000);
//     const user = await User.findOne({ employeeId });
//     if (!user) exists = false;
//   }

//   return employeeId;
// };

// /* ================= REGISTER + OTP ================= */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(409).json({ success: false, message: "User already exists" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const employeeId = await generateEmployeeId();

//     const user = await User.create({
//       name,
//       email,
//       password, // plaintext is fine, pre-save hook hashes it
//       employeeId,
//       otp,
//       otpExpiry: Date.now() + 10 * 60 * 1000,
//       isVerified: false,
//     });

//     await sendEmail({
//       to: email,
//       subject: "Verify your Telecaller account",
//       html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "OTP sent to email",
//       userId: user._id,
//     });
//   } catch (err) {
//     console.error("REGISTER ERROR:", err);
//     res.status(500).json({ success: false, message: "Registration failed" });
//   }
// };

// /* ================= VERIFY REGISTER OTP ================= */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     return res.json({ success: true, message: "Account verified successfully" });
//   } catch (err) {
//     console.error("VERIFY OTP ERROR:", err);
//     res.status(500).json({ success: false, message: "OTP verification failed" });
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

//     if (!user.isVerified)
//       return res.status(403).json({ success: false, message: "Please verify email first" });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

//     const accessToken = generateAccessToken(user._id);
//     const refreshToken = generateRefreshToken(user._id);

//     user.refreshToken = refreshToken;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Login successful",
//       accessToken,
//       refreshToken,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         employeeId: user.employeeId,
//         avatar: user.avatar || null,
//         mobile: user.mobile || "",
//       },
//     });
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// };

// /* ================= FORGOT PASSWORD ================= */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     await sendEmail({
//       to: email,
//       subject: "Reset your Telecaller password",
//       html: `<h3>Your password reset OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.json({ success: true, message: "OTP sent to email" });
//   } catch (err) {
//     console.error("FORGOT PASSWORD ERROR:", err);
//     res.status(500).json({ success: false, message: "Forgot password failed" });
//   }
// };

// /* ================= RESET PASSWORD ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     if (!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

//     user.password = newPassword; // pre-save hook hashes automatically
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     return res.json({ success: true, message: "Password reset successful" });
//   } catch (err) {
//     console.error("RESET PASSWORD ERROR:", err);
//     res.status(500).json({ success: false, message: "Reset password failed" });
//   }
// };









// import User from "../models/User.js";
// import { sendEmail } from "../utils/email.js";
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// /* ================= EMPLOYEE ID ================= */
// const generateEmployeeId = async () => {
//   let employeeId;
//   let exists = true;

//   while (exists) {
//     employeeId = "EMP-" + Math.floor(100000 + Math.random() * 900000);
//     const user = await User.findOne({ employeeId });
//     if (!user) exists = false;
//   }

//   return employeeId;
// };

// /* ================= REGISTER ================= */
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const existing = await User.findOne({ email });
//     if (existing)
//       return res.status(409).json({ success: false, message: "User already exists" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     const employeeId = await generateEmployeeId();

//     await User.create({
//       name,
//       email,
//       password,
//       employeeId,

//       otp,
//       otpType: "REGISTER",
//       otpExpiry: new Date(Date.now() + 10 * 60 * 1000),

//       isVerified: false,
//     });

//     // non-blocking email
//     sendEmail({
//       to: email,
//       subject: "Verify your account",
//       html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "OTP sent to email",
//     });

//   } catch (err) {
//     console.error("REGISTER ERROR:", err);
//     return res.status(500).json({ success: false, message: "Registration failed" });
//   }
// };

// /* ================= VERIFY OTP ================= */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (
//       user.otpType !== "REGISTER" ||
//       !user.otp ||
//       user.otp !== otp ||
//       user.otpExpiry < new Date()
//     ) {
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
//     }

//     user.isVerified = true;
//     user.otp = null;
//     user.otpType = null;
//     user.otpExpiry = null;

//     await user.save();

//     return res.json({
//       success: true,
//       message: "Account verified successfully",
//     });

//   } catch (err) {
//     console.error("VERIFY OTP ERROR:", err);
//     return res.status(500).json({ success: false, message: "OTP verification failed" });
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     if (!user.isVerified)
//       return res.status(403).json({ success: false, message: "Verify email first" });

//     const match = await user.comparePassword(password);
//     if (!match)
//       return res.status(401).json({ success: false, message: "Invalid credentials" });

//     const accessToken = generateAccessToken(user._id);
//     const refreshToken = generateRefreshToken(user._id);

//     user.refreshToken = refreshToken;
//     await user.save();

//     return res.json({
//       success: true,
//       message: "Login successful",
//       accessToken,
//       refreshToken,
//       user,
//     });

//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     return res.status(500).json({ success: false, message: "Login failed" });
//   }
// };

// /* ================= FORGOT PASSWORD ================= */
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpType = "RESET";
//     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

//     await user.save();

//     sendEmail({
//       to: email,
//       subject: "Reset Password OTP",
//       html: `<h3>Your OTP: ${otp}</h3><p>Valid for 10 minutes</p>`,
//     });

//     return res.json({
//       success: true,
//       message: "OTP sent to email",
//     });

//   } catch (err) {
//     console.error("FORGOT PASSWORD ERROR:", err);
//     return res.status(500).json({ success: false, message: "Failed" });
//   }
// };

// /* ================= RESET PASSWORD ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     if (
//       user.otpType !== "RESET" ||
//       !user.otp ||
//       user.otp !== otp ||
//       user.otpExpiry < new Date()
//     ) {
//       return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
//     }

//     user.password = newPassword;

//     user.otp = null;
//     user.otpType = null;
//     user.otpExpiry = null;

//     await user.save();

//     return res.json({
//       success: true,
//       message: "Password reset successful",
//     });

//   } catch (err) {
//     console.error("RESET PASSWORD ERROR:", err);
//     return res.status(500).json({ success: false, message: "Reset failed" });
//   }
// };






import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

/* ================= EMPLOYEE ID ================= */
const generateEmployeeId = async () => {
  let employeeId;
  let exists = true;

  while (exists) {
    employeeId = "EMP-" + Math.floor(100000 + Math.random() * 900000);
    const user = await User.findOne({ employeeId });
    if (!user) exists = false;
  }

  return employeeId;
};

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email?.toLowerCase().trim();

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const employeeId = await generateEmployeeId();

    await User.create({
      name,
      email,
      password,
      employeeId,
      otp,
      otpType: "REGISTER",
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      isVerified: false,
    });

    sendEmail({
      to: email,
      subject: "Verify your account",
      html: `<h3>Your OTP is: ${otp}</h3><p>Valid for 10 minutes</p>`,
    });

    return res.status(201).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;

    email = email?.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (
      user.otpType !== "REGISTER" ||
      !user.otp ||
      user.otp !== otp ||
      user.otpExpiry < new Date()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpType = null;
    user.otpExpiry = null;

    await user.save();

    return res.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return res
      .status(500)
      .json({ success: false, message: "OTP verification failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.toLowerCase().trim();

    console.log("LOGIN REQUEST EMAIL:", email);

    const user = await User.findOne({ email });
    console.log("USER FOUND:", !!user);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("DB HASH:", user.password);
    console.log("IS VERIFIED:", user.isVerified);

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Verify email first" });
    }

    const match = await user.comparePassword(password);
    console.log("PASSWORD MATCH:", match);

    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;

    email = email?.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpType = "RESET";
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    sendEmail({
      to: email,
      subject: "Reset Password OTP",
      html: `<h3>Your OTP: ${otp}</h3><p>Valid for 10 minutes</p>`,
    });

    return res.json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;

    email = email?.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (
      user.otpType !== "RESET" ||
      !user.otp ||
      user.otp !== otp ||
      user.otpExpiry < new Date()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpType = null;
    user.otpExpiry = null;

    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Reset failed",
    });
  }
};
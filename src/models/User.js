
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     employeeId: { type: String, unique: true, sparse: true },

//     avatar: { type: String, default: "" },
//     mobile: { type: String, default: "" },

//     isVerified: { type: Boolean, default: false },

//     otp: String,
//     otpExpiry: Date,

//     refreshToken: String,
//   },
//   { timestamps: true }
// );

// /* ---------- HASH PASSWORD ONLY IF MODIFIED ---------- */
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });

// /* ---------- COMPARE PASSWORD ---------- */
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// export default mongoose.model("User", userSchema);









// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },

//     employeeId: { type: String, unique: true, sparse: true },

//     avatar: { type: String, default: "" },
//     mobile: { type: String, default: "" },

//     isVerified: { type: Boolean, default: false },

//     otp: String,
//     otpExpiry: Date,

//     refreshToken: String,

//     /* ---------- SETTINGS SYSTEM (NEW) ---------- */
//     settings: {
//       notifications: { type: Boolean, default: true },
//       biometric: { type: Boolean, default: false },
//       autoDial: { type: Boolean, default: true },
//       recordCalls: { type: Boolean, default: false },
//       language: { type: String, default: "English" },
//       region: { type: String, default: "India" }
//     },

//     fcmToken: { type: String, default: "" }
//   },
//   { timestamps: true }
// );

// /* ---------- HASH PASSWORD ONLY IF MODIFIED ---------- */
// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });

// /* ---------- COMPARE PASSWORD ---------- */
// userSchema.methods.comparePassword = async function (password) {
//   return bcrypt.compare(password, this.password);
// };

// export default mongoose.model("User", userSchema);










import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    employeeId: { type: String, unique: true, sparse: true },

    avatar: { type: String, default: "" },
    mobile: { type: String, default: "" },

    isVerified: { type: Boolean, default: false },

    /* ================= OTP SYSTEM FIX ================= */
    otp: { type: String },
    otpExpiry: { type: Number }, // safer than Date
    otpType: { type: String, default: "" }, // REGISTER | RESET

    refreshToken: { type: String },

    /* ---------- SETTINGS SYSTEM ---------- */
    settings: {
      notifications: { type: Boolean, default: true },
      biometric: { type: Boolean, default: false },
      autoDial: { type: Boolean, default: true },
      recordCalls: { type: Boolean, default: false },
      language: { type: String, default: "English" },
      region: { type: String, default: "India" }
    },

    fcmToken: { type: String, default: "" }
  },
  { timestamps: true }
);

/* ---------- HASH PASSWORD ONLY IF MODIFIED ---------- */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* ---------- COMPARE PASSWORD ---------- */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
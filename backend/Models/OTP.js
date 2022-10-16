const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
    expiresIn: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OTPModel = mongoose.model("otp", otpSchema);
module.exports = OTPModel;

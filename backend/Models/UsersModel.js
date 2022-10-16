const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

// generating authToken
userSchema.methods.getAuthToken = function () {
  return jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

const User = mongoose.model("user", userSchema);
module.exports = User;

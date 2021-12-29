const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter Your first name"],
    maxlength: [30, "First Name cannot exceed 30 characters"],
    minlength: [3, "First Name should be more than 3 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter your last name"],
    maxlength: [30, "Last name cannot exceed 30 characters"],
    minlength: [3, "Last Name should be more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password!"],
    minLength: [8, "Password should have more than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  messages: [
    {
      newMsg: {
        type: String,
      },
      sendAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Hashing password before saving on the server
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparing passwords
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// generating authToken
userSchema.methods.getAuthToken = function () {
  return jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

const User = mongoose.model("user", userSchema);
module.exports = User;

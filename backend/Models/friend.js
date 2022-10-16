const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    friend: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model("friend", friendSchema);
module.exports = Friend;

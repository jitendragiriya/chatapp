const mongoose = require("mongoose");

const NewPostSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      default: "",
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", NewPostSchema);
module.exports = Post;

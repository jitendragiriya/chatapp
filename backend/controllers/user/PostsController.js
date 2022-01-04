// User module is here
const User = require("../../Models/UsersModel");
const NewPost = require("../../Models/UserPost");

// Error handler
const CatchAsyncError = require("../../Middlewares/CatchAsyncError");

exports.userPostNew = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user);
  const text = req.body.text;
  await NewPost.create({
    user,
    text,
  });

  res.status(200).json({
    success: true,
    message: "you post has been posted."
  });
});

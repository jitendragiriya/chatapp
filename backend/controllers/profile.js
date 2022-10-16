const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const User = require("../Models/UsersModel");
const ErrorHandler = require("../Utils/ErrorHandler");
//update profile
exports.updateProfile = CatchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  const { avatar } = req.body;
  if (!user) {
    return next(new ErrorHandler("Something went wrong..."), 400);
  }
  await User.findByIdAndUpdate(req.user.id, { $set: { avatar } });
  user = await User.findById(req.user.id);

  res.status(200).json(user);
});

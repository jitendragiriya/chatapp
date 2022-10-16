// Error handler
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const User = require("../Models/UsersModel");
const ErrorHandler = require("../Utils/ErrorHandler");

//get all users
exports.getAllUsers = CatchAsyncError(async (req, res, next) => {
  const users = await User.find({});
  await res.status(200).json(users);
});

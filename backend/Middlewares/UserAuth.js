const CatchAsyncError = require("./CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

const jsonwebtoken = require("jsonwebtoken");
const User = require("../Models/UsersModel");

// checking user is logged in or not.

exports.isAuthenticated = CatchAsyncError(async (req, res, next) => { 
  const {mttrhr}  = req.cookies;

  if (!mttrhr) {
    return next(new ErrorHandler("Please login first", 401));
  }

  const decodeData = jsonwebtoken.verify(mttrhr, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodeData.id);
  next();
});

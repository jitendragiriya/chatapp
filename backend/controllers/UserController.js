// User module is here
const User = require("../Models/UsersModel");

// Error handler
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

const sendToken = require("../Utils/SendToken");

// creating some user actions

// 1.==============register user====================
exports.registerUser = CatchAsyncError(async (req, res, next) => {
  // taking all the cradatials from your inputs in form
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  let user = await User.findOne({ email }); // finding user using email id
  if (user) {
    // if this email id user is exist than show the error
    return next(new ErrorHandler("This username is already exist!", 401));
  }

  if (password !== confirmPassword) {
    // if password and confirm password is not matching than show the error
    return next(new ErrorHandler("Password does not match please try again!"));
  }

  user = await User.create({
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  });

  // sending the token after succesffully singup
  sendToken(user, 200, res);
});

// 2.==============login user====================
exports.loginUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password."));
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Please enter a valid email or password."));
  }
  const passwordCompare = await user.comparePassword(password);
  if (!passwordCompare) {
    return next(new ErrorHandler("Please enter a valid email or password."));
  }
  sendToken(user, 200, res);
});

// 2.==============is user already loggedin====================
exports.getUserDetails = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    user,
  });
});

// 2.==============if user logged in than user logout====================
exports.logoutUser = CatchAsyncError(async (req, res, next) => {
  res.cookie("mttrhr", null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  });
  
  res.status(200).json({
    success: true,
    message: "logout successfully",
  });
});

// 5.==============getting like from user====================
exports.likeAPost = CatchAsyncError(async (req, res, next) => {
  const { like, PostId } = req.body;
  const likes = {
    user: req.user._id,
    name: req.user.username,
    like,
  };

  const user = await User.findById(PostId);

  const isLiked = user.likes.find(
    (li) => li.user.toString() === req.user._id.toString()
  );
  if (isLiked) {
    return next(new ErrorHandler("You are already liked this post.", 401));
  }
});

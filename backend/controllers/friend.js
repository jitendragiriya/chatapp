// Error handler
const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const Friend = require("../Models/friend");
const User = require("../Models/UsersModel");
const ErrorHandler = require("../Utils/ErrorHandler");

// ==============get friend request====================
exports.getFriend = CatchAsyncError(async (req, res, next) => {
  const phone = req.query.phone;
  if (!phone) {
    //if user phone number is not given
    return next(new ErrorHandler("Please Enter user phone!"));
  }
  const user = await User.findOne({ phone });
  if (!user) {
    // if the user is not exist with given phone number.
    return next(new ErrorHandler("This user is not exist!", 404));
  }
  res.status(200).json(user);
});

// send friend request / add friends
exports.addFriend = CatchAsyncError(async (req, res, next) => {
  const { phone } = req.body;
  if (!phone) {
    //if user phone number is not given
    return next(new ErrorHandler("Please Enter user phone!"));
  }
  const user = await User.findOne({ phone });
  if (!user) {
    // if the user is not exist with given phone number.
    return next(new ErrorHandler("This user is not exist!", 404));
  }

  if (user.phone === req.user.phone) {
    return next(new ErrorHandler("You can't add as friend yourself!"), 403);
  }

  let isFriend = await Friend.findOne({
    $and: [{ userId: req.user._id }, { friend: user }],
  });

  if (isFriend && isFriend._id) {
    await res.status(200).json(isFriend);
  } else {
    const friend = await Friend.create({ userId: req.user._id, friend: user });
    //create friend for my friend
    await Friend.create({ userId: user._id, friend: req.user });
    await res.status(200).json(friend);
  }
});

//get all friends
exports.getAllFriends = CatchAsyncError(async (req, res, next) => {
  const friends = await Friend.find({ userId: req.user.id });
  if (!friends.length) {
    return next(new ErrorHandler("You have not any friends", 404));
  }
  await res.status(200).json(friends);
});

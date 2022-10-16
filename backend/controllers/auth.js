const CatchAsyncError = require("../Middlewares/CatchAsyncError");
const User = require("../Models/UsersModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const sendToken = require("../Utils/SendToken");
const otpGenerator = require("otp-generator");
const OTPModel = require("../Models/OTP");
const sendMail = require("../Utils/sendMail");

//login with otp
exports.loginWithOTP = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Please Enter your email!"));
  }
  let user = await User.findOne({ email });
  const emailUsername = (email) => {
    var username = "";
    for (let index = 0; index < email.length; index++) {
      let CharCode = email.charCodeAt(index); 
      if ((CharCode === 64)) {
        break;
      } else {
        username += email.charAt(index); 
      }
    }
    return username
  };
  if (!user) {
    const username = emailUsername(email); 
    if (username && username.length) { 
      user = await User.create({ email, username });
    }
  }
  //generate otp
  //if otp is already generated than delete previous email
  const getOpt = await OTPModel.find({ email });
  if (getOpt) {
    await OTPModel.deleteMany({ email });
  }
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const generated = await OTPModel.create({
    email,
    otp,
    expiresIn: Date.now() + process.env.LOGIN_OTP_EXPIRES, //10 minute future
  });

  sendMail({
    email,
    message: `Your verification OTP is : ${generated.otp} \n\nThank you!`,
    subject: `MyChat : Profilce Verification Code :${generated.createdAt
      .toString()
      .slice(0, 24)}`,
  });

  res
    .status(200)
    .json({ message: "OTP send to your email address successfully." });
});

//verify email
exports.verifyEmailOTP = CatchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!otp) {
    return next(new ErrorHandler("Please Enter your email!"));
  }
  if (!email) {
    return next(
      new ErrorHandler("Something went wrong please try again later!", 405)
    );
  }

  const generated = await OTPModel.findOne({ email });
  //match otp
  if (Date.now() > generated.expiresIn) {
    return next(new ErrorHandler("Please regenerate OTP!", 400));
  } else if (otp !== generated.otp) {
    return next(new ErrorHandler("Please enter a valid OTP!", 400));
  }

  if (otp === generated.otp) {
    const user = await User.findOne({ email });
    sendToken(user, 200, res);
  }
});

// ==============is user already loggedin====================
exports.authUser = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
});

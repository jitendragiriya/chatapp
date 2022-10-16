const SendToken = (user, statusCode, res) => {
  const token = user.getAuthToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    path: "/",
  };
  res.status(statusCode).cookie("mttrhr", token, options).json(token);
};

module.exports = SendToken;

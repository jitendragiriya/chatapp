const express = require("express");
const { isAuthenticated } = require("../Middlewares/UserAuth");
const {
  registerUser,
  loginUser,
  likeAPost,
  getUserDetails,
  logoutUser,
} = require("../controllers/UserController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, getUserDetails);
router.get("/logout", isAuthenticated, logoutUser);
router.post("/post/like", isAuthenticated, likeAPost);

module.exports = router;

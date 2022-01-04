const express = require("express");
const { isAuthenticated } = require("../Middlewares/UserAuth");
const {
  registerUser,
  loginUser,
  getUserDetails,
  logoutUser,
  getOtherUserDetails,
} = require("../controllers/user/UserController");
const {
  conversation,
  getMessageWithUsers,
  getUserconversation,
} = require("../controllers/user/UserMsgController");
const { userPostNew } = require("../controllers/user/PostsController");
const { fetchallPost } = require("../controllers/posts/post");
const router = express.Router();

// ====================user routes ======================//
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, getUserDetails);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/user/:id",isAuthenticated, getOtherUserDetails)

//==============chating ============//
router.post("/conversation", isAuthenticated, conversation);
router.get("/m/users/all", isAuthenticated, getMessageWithUsers);
router.get("/messages/all/:id", getUserconversation);

//=================post ==================//

router.post("/post/new", isAuthenticated, userPostNew);
router.get("/fetch/all/post", isAuthenticated, fetchallPost);

module.exports = router;

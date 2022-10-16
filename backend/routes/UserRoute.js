const express = require("express");
const { isAuthenticated } = require("../Middlewares/UserAuth");
const {
  authUser,
  loginWithOTP,
  verifyEmailOTP,
} = require("../controllers/auth");
const {
  getFriend,
  addFriend,
  getAllFriends,
} = require("../controllers/friend");
const { updateProfile } = require("../controllers/profile");
const { getAllUsers } = require("../controllers/peoples");
const { conversation, getMessageWithUsers, getUserconversation, getChatUser } = require("../controllers/chat");
const router = express.Router();

// ====================user routes ======================//
// router.post("/register", registerUser);
router.post("/login", loginWithOTP);
router.post("/verify-email", verifyEmailOTP);
router.get("/auth", isAuthenticated, authUser);
router.put("/profile/update", isAuthenticated, updateProfile);
router.get("/friend", isAuthenticated, getFriend);
router.post("/friend/add", isAuthenticated, addFriend);
router.get("/friend/all", isAuthenticated, getAllFriends);
router.get("/people/all", isAuthenticated, getAllUsers);

//==============chating ============//
router.post("/conversation", isAuthenticated, conversation);
router.get("/messages/all/:id", isAuthenticated, getUserconversation);
router.get("/user/:id", isAuthenticated, getChatUser);


module.exports = router;

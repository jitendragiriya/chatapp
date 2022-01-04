// User module is here
const User = require("../../Models/UsersModel");
const Conversation = require("../../Models/Conversation");
const Message = require("../../Models/messages");

// Error handler
const CatchAsyncError = require("../../Middlewares/CatchAsyncError");
const ErrorHandler = require("../../Utils/ErrorHandler");

// ==============convesation between users====================
exports.conversation = CatchAsyncError(async (req, res, next) => {
  const { recieverId, text } = req.body;
  const senderId = req.user.id;

  if (recieverId === senderId) {
    return next(new ErrorHandler("Sorry you can't message yourself!"));
  }
  // checking user convarsation id is exist or not
  const isExist = await Conversation.find({
    membersId: { $all: [senderId, recieverId] },
  });

  const sender = await User.findById(senderId);
  const reciever = await User.findById(recieverId);
  if (isExist.length === 0) {
    // if user convarsation id is not exist than create new conversation id
    const newConversation = new Conversation({
      members: [sender, reciever],
      membersId: [senderId, recieverId],
      message: text,
    });

    const saveConversation = await newConversation.save();

    const newMessage = new Message({
      conversationId: saveConversation.id,
      senderId,
      message: text,
    });

    const savemsg = await newMessage.save();

    return res.status(200).json({
      success: true,
      conversation: savemsg,
    });
  }

  // if user conversation id is exist than return that
  const message = new Message({
    conversationId: isExist[0].id,
    senderId,
    message: text,
  });

  const savedMsg = await message.save();

  await Conversation.updateOne(
    {
      _id: isExist[0].id,
    },
    { $set: { message: text } }
  );
  res.status(200).json({
    success: true,
    conversation: savedMsg,
  });
});

// ==============get convesation between users====================
exports.getUserconversation = CatchAsyncError(async (req, res, next) => {
  const conversation = await Message.find({
    conversationId: req.params.id,
  });

  res.status(200).json({
    success: true,
    conversation,
  });
});

// ==============get users====================
exports.getMessageWithUsers = CatchAsyncError(async (req, res, next) => {
  const users = await Conversation.find({
    membersId: req.user.id,
  });
  if (!users) {
    return next(new ErrorHandler("there no chats."));
  }
  res.status(200).json({
    success: true,
    users,
  });
});

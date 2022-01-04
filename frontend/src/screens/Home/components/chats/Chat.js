import React, { useState, useEffect } from "react";
import "./Chat.css";
import img1 from "./number-3-three-260nw-742434955-1.jpg";
import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreHorizRounded";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import ZoomOutIcon from "@mui/icons-material/ZoomOutMap";
import { io } from "socket.io-client";
import ScrollToBottm from "react-scroll-to-bottom";
import Messages from "./Messages";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { getMsgWithUsers } from "../../../../reduxStore/actions/ChatingAction";
import { sendMessage } from "../../../../reduxStore/actions/ChatingAction";
import ChattingUsers from "./ChattingUsers";
import { uid } from "uid";
import { notifyError } from "../../../../utils/Messages";

let socket;
const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const dispatch = useDispatch();
  const [inputmsg, setInputmsg] = useState({ chat: "" });
  const [expcolls, setExpcolls] = useState(false);
  const [newMsgUser, setNewMsgUser] = useState([]);
  const [msg, setMsg] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { user: otherUser } = useSelector((state) => state.knowuser);
  const { MsgUser } = useSelector((state) => state.msgUsers);
  const {
    messages,
    newMessage,
    error: msgError,
  } = useSelector((state) => state.message);
  const { messages: allmsg, newMessage: nMg } = useSelector(
    (state) => state.conversations
  );

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("getMessage", (response) => {
      setMsg((m) => [...m, { ...response, _id: uid(20) }]);
    });
  }, []);

  useEffect(() => {
    socket.emit("adduser", { user: user._id });
    socket.on("onlineUser", (users) => {});
  }, [user]);

  useEffect(() => {
    // socket io endpoints
    socket.on("connect", () => {
      //   // console.log("socket conneted");
    });

    socket.on("leaved", (response) => {});

    socket.on("disconnect", (response) => {
      //   // console.log(response);
    });
  }, [socket]);

  useEffect(() => {
    if (newMessage) {
      setMsg((m) => [...m, messages]);
    }
  }, [messages]);

  useEffect(() => {
    let nnn = [];
    if (MsgUser) {
      MsgUser.map((m) => {
        let member = m.members.filter((mm) => mm._id !== user._id);
        nnn.push({
          _id: m._id,
          reciever: member[0],
          message: m.message,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
        });
      });
    }
    setNewMsgUser(nnn);
    if (nMg) {
      setMsg(allmsg);
    }
  }, [MsgUser, nMg]);

  const expendMsg = () => {
    setExpcolls(!expcolls);
  };

  const closeChatWindow = () => {
    document
      .querySelector(".msg-overlay-bubble__message-box")
      .classList.remove("open-chat");
  };

  const getUsers = () => {
    dispatch(getMsgWithUsers());
  };

  const onchange = (e) => {
    setInputmsg({ ...inputmsg, [e.target.name]: e.target.value });
  };

  const sendMessages = async (e) => {
    e.preventDefault();
    if (inputmsg.chat === "") {
      return;
    }
    dispatch(
      sendMessage({
        senderId: user._id,
        recieverId: otherUser._id,
        text: inputmsg.chat,
      })
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      recieverId: otherUser._id,
      message: inputmsg.chat,
    });

    setInputmsg({ chat: "" });
  };

  useEffect(() => {
    const cls = document.querySelector(".resizeWindow");
    const cls1 = document.querySelector(".msg-overlay-bubble__message-box");
    cls.addEventListener("click", function () {
      cls1.classList.toggle("bigSize");
    });
  }, []);

  useEffect(() => {
    if (msgError) {
      notifyError(msgError);
    }
  }, [msgError]);

  return (
    <div className="msg-overlay-bubble__container">
      <div className="msg-overlay-bubble__container-header">
        <span>
          <img src={img1} alt="" />
          <p>Messaging</p>
        </span>
        <span>
          <IconButton>
            <MoreIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              expendMsg();
              getUsers();
              setMsg([]);
            }}
          >
            {expcolls ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </span>
      </div>

      {/*  msg with users users container  */}
      <div
        className={
          expcolls
            ? "msg-overlay-bubble__container-messages active"
            : "msg-overlay-bubble__container-messages"
        }
      >
        {newMsgUser &&
          newMsgUser.map((user) => (
            <ChattingUsers user={user} key={user._id} />
          ))}
      </div>

      {/* starting chating with clients area in the window */}
      <div className="msg-overlay-bubble__message-box">
        <div className="msg-overlay-bubble__container-header">
          <span>
            <img src={img1} alt="" />
            <p>
              {otherUser && otherUser.first_name + " "}
              {otherUser && otherUser.last_name}
            </p>
          </span>
          <span>
            <IconButton className="resizeWindow">
              <ZoomOutIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                closeChatWindow();
                setMsg([]);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </span>
        </div>
        <ScrollToBottm className="chat__body">
          {msg &&
            msg.map((msg) => (
              <Messages
                key={msg._id}
                message={msg.message}
                user={user._id === msg.senderId ? true : false}
                time={msg.createdAt}
              />
            ))}
        </ScrollToBottm>
        <div className="msg-overlay-bubble__message-box-input">
          <form onSubmit={sendMessages}>
            <textarea
              placeholder="Type a massage"
              rows={1}
              name="chat"
              id="chat"
              onChange={onchange}
              value={inputmsg.chat}
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
      {/* ending chating with clients area in the window */}
    </div>
  );
};

export default Chat;

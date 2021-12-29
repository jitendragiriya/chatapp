import React, { useState, useEffect } from "react";
import "./Chat.css";
import img1 from "./number-3-three-260nw-742434955-1.jpg";
import { IconButton } from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreHorizRounded";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
// import ZoomInIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutIcon from "@mui/icons-material/ZoomOutMap";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import ScrollToBottm from "react-scroll-to-bottom";
import Messages from "./Messages";
import { uid } from "uid";

let socket;
const ENDPOINT = "/";

const Chat = () => {
  let workdescription =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vita molestiae aperiam similique repellendus doloribus voluptatum anim commodi doloremque, quisquam facilis quis nulla atque id voluptas accusantium possimus sint recusandae, corrupti iusto illo eum sunt!  iusto illo eum sunt!";

  const maxlength = 60;
  const [expcolls, setExpcolls] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [inputmsg, setInputmsg] = useState({ chat: "" });
  const [messagess, setMessagess] = useState([]);
  const expendMsg = () => {
    setExpcolls(!expcolls);
  };

  const openChat = () => {
    document
      .querySelector(".msg-overlay-bubble__message-box")
      .classList.add("open-chat");
  };

  const closeChatWindow = () => {
    document
      .querySelector(".msg-overlay-bubble__message-box")
      .classList.remove("open-chat");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputmsg.chat === "") {
      return;
    }
    socket.emit("chat message", {
      message: inputmsg.chat,
      userId: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
    });
    setInputmsg({ chat: "" });
  };

  useEffect(() => {
    const cls = document.querySelector(".resizeWindow");
    const cls1 = document.querySelector(".msg-overlay-bubble__message-box");
    cls.addEventListener("click", function () {
      cls1.classList.toggle("bigSize");
    });

    // socket io endpoints
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      // console.log("socket conneted");
    });

    socket.emit("joined", {
      user: `${user.first_name} ${user.last_name}`,
      id: user._id,
    });

    socket.on("welcome", (response) => {
      setMessagess([...messagess, response]);
    });

    socket.on("userJoined", (response) => {
      setMessagess([...messagess, response]);
    });

    socket.on("leaved", (response) => {
      setMessagess([...messagess, response]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (response) => {
      setMessagess([...messagess, response]);
    });
    return () => {
      socket.off();
    };
  }, [messagess]);

  const onchange = (e) => {
    setInputmsg({ ...inputmsg, [e.target.name]: e.target.value });
  };

  console.log(messagess);
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
          <IconButton onClick={expendMsg}>
            {expcolls ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </span>
      </div>
      <div
        className={
          expcolls
            ? "msg-overlay-bubble__container-messages active"
            : "msg-overlay-bubble__container-messages"
        }
      >
        <div
          className="msg-overlay-bubble__container-message-new"
          onClick={openChat}
        >
          <img src={img1} alt="" />
          <div className="msg-overlay-bubble__container-messages-info">
            <div className="msg-overlay-bubble__container-messages-header">
              <h4>
                {user && user.first_name + " "}
                {user && user.last_name}
              </h4>
              <h4>{workdescription.slice(0, 10)}</h4>
            </div>
            <p>
              {workdescription.length > maxlength
                ? workdescription.substring(0, maxlength - 3) + "..."
                : workdescription}
            </p>
          </div>
        </div>
      </div>

      {/* starting chating with clients area in the window */}
      <div className="msg-overlay-bubble__message-box">
        <div className="msg-overlay-bubble__container-header">
          <span>
            <img src={img1} alt="" />
            <p>
              {user && user.first_name + " "}
              {user && user.last_name}
            </p>
          </span>
          <span>
            <IconButton className="resizeWindow">
              <ZoomOutIcon />
            </IconButton>
            <IconButton>
              <MoreIcon />
            </IconButton>
            <IconButton onClick={closeChatWindow}>
              <CloseIcon />
            </IconButton>
          </span>
        </div>
        <ScrollToBottm className="chat__body">
          {messagess.map((item) => (
            <Messages
              key={uid(15)}
              message={item.message}
              user={user._id === item.id ? true : false}
              sendBy={item.user}
            />
          ))}
        </ScrollToBottm>
        <div className="msg-overlay-bubble__message-box-input">
          <form onSubmit={sendMessage}>
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

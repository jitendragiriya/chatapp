import React, { useState, useEffect } from "react";
import "./Chat.css";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import ScrollToBottm from "react-scroll-to-bottom";
import Messages from "./Messages";
import { connect, useSelector } from "react-redux";
import { uid } from "uid";
import { ENDPOINT } from "../../constants";
import { getAllMessages, sendMessage } from "../../actions/chat";
import { clearError } from "../../actions/clearError";

let socket;

const Chat = (props) => {
  const [inputmsg, setInputmsg] = useState({ chat: "" });
  const [expcolls, setExpcolls] = useState(false);
  const [msg, setMsg] = useState([]);
  const {
    messages,
    newMessage,
    error: msgError,
  } = useSelector((state) => state.Message);
  const { messages: allmsg, newMessage: nMg } = useSelector(
    (state) => state.Conversations
  );

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("getMessage", (response) => {
      setMsg((m) => [...m, { ...response, _id: uid(20) }]);
    });
  }, []);

  useEffect(() => {
    if (props.user && props.user.user && props.user.user._id) {
      socket.emit("adduser", { user: props.user.user._id });

      socket.on("onlineUser", (users) => {
        if (users && Array.isArray(users) && users.length) {
          props.setOnlineUsers(users);
        }
      });
    }
  }, [props.user]);

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

  //on new message
  useEffect(() => {
    if (newMessage) {
      setMsg((m) => [...m, messages]);
    }
  }, [messages]);

  //get all conversations
  useEffect(() => {
    if (props.allmsg && props.allmsg.messages && props.allmsg.messages.length) {
      setMsg(props.allmsg.messages);
    }
  }, [props.allmsg]);

  //error
  useEffect(() => {
    if (props.allmsg && props.allmsg.error) {
      props.clear();
      setMsg([]);
    }
  }, [props.allmsg]);

  const expendMsg = () => {
    setExpcolls(!expcolls);
  };

  const onchange = (e) => {
    setInputmsg({ ...inputmsg, [e.target.name]: e.target.value });
  };

  const sendMessages = async (e) => {
    e.preventDefault();
    if (inputmsg.chat === "") {
      return;
    }
    props.sendMessage({
      senderId: props.user.user._id,
      recieverId: props.otherUser.user._id,
      text: inputmsg.chat,
    });

    socket.emit("sendMessage", {
      senderId: props.user.user._id,
      recieverId: props.otherUser.user._id,
      message: inputmsg.chat,
    });

    setInputmsg({ chat: "" });
  };

  useEffect(() => {
    if (msgError) {
      props.clear();
    }
  }, [msgError]);

  useEffect(() => {
    if (props.otherUser && props.otherUser.user && props.otherUser.user._id) {
      props.getAllMessage(props.otherUser.user._id);
    }
  }, [props.otherUser]);

  return (
    <>
      <div className="relative bg-white h-full">
        <img
          src="https://a5.mzstatic.com/us/r30/Purple5/v4/f2/2b/d0/f22bd06f-7a14-e2f9-f455-371f3a074518/screen1136x1136.jpeg"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {props.otherUser && props.otherUser.user && props.otherUser.user._id ? (
          <>
            <div className="relative w-full flex items-center bg-gradient-to-r from-[#e6e6e6] to-white px-3 py-1">
              <div className="h-10 w-10 rounded-full overflow-hidden relative">
                {props.otherUser &&
                props.otherUser.user &&
                props.otherUser.user.avatar ? (
                  <img
                    src={props.otherUser.user.avatar}
                    alt=""
                    className="absolute top-0 left-0 h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-green-500 capitalize font-bold text-white">
                    {props.otherUser &&
                      props.otherUser.user &&
                      props.otherUser.user.username.slice(0, 1)}
                  </div>
                )}
              </div>
              <p className="ml-2 font-semibold">
                {props.otherUser &&
                  props.otherUser.user &&
                  props.otherUser.user.username}
              </p>
            </div>
            <ScrollToBottm className="chat__body">
              {msg &&
                msg.map((msg) => (
                  <Messages
                    key={msg._id}
                    message={msg.message}
                    user={props.user.user._id === msg.senderId ? true : false}
                    time={msg.createdAt}
                  />
                ))}
            </ScrollToBottm>
          </>
        ) : (
          <></>
        )}
        <div className="absolute bottom-0 left-0 w-full">
          <form onSubmit={sendMessages} className="flex items-end">
            <textarea
              placeholder="Type a massage"
              rows={1}
              name="chat"
              className="w-full h-auto outline-none block resize-y border-t border-r border-gray-200 p-2 textarea overflow-auto sidebar-scroll bg-[#eeeeee4b] rounded-tr text-white"
              onChange={onchange}
              value={inputmsg.chat}
              disabled={
                props.otherUser &&
                props.otherUser.user &&
                !props.otherUser.user._id
              }
            />
            <button
              type="submit"
              className="p-2 text-white"
              disabled={
                props.otherUser &&
                props.otherUser.user &&
                !props.otherUser.user._id
              }
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
  otherUser: state.Knowuser,
  allmsg: state.Conversations,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (data) => dispatch(sendMessage(data)),
  getAllMessage: (userId) => dispatch(getAllMessages(userId)),
  clear: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

import React from "react";
import "./Messages.css";
import { format } from "timeago.js";

const Messages = ({ message, user, time }) => {
  if (user) {
    return (
      <>
        <p className="chat__massage chat__reciever">{message}</p>
        <div className="chat__timestamp left">{format(time)}</div>
      </>
    );
  } else {
    return (
      <>
        <p className="chat__massage">{message}</p>
        <div className="chat__timestamp">{format(time)}</div>
      </>
    );
  }
};

export default Messages;

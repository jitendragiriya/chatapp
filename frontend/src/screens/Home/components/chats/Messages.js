import React, { Fragment } from "react";
import "./Messages.css";

const Messages = ({ message, user, sendBy }) => {
  if (user) {
    return (
      <p className="chat__massage chat__reciever">
        <span className="chat__name">Me</span>
        {message}
        <span className="chat__timestamp"></span>
      </p>
    );
  } else {
    return (
      <p className="chat__massage">
        <span className="chat__name">{sendBy}</span>
        {message}
        <span className="chat__timestamp"></span>
      </p>
    );
  }
};

export default Messages;

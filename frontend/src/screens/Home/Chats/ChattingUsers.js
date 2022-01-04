import React from "react";
import { useDispatch } from "react-redux";
import { getOhteruserDetails } from "../../../reduxStore/actions/UserAction";
import img1 from "./number-3-three-260nw-742434955-1.jpg";
import {
  clearAllmsg,
  getAllMessages,
} from "../../../reduxStore/actions/ChatingAction";

const ChattingUsers = ({ user }) => {
  const maxlength = 60;
  const dispatch = useDispatch();
  const openChat = () => {
    document
      .querySelector(".msg-overlay-bubble__message-box")
      .classList.add("open-chat");
  };

  const findUser = (id) => {
    dispatch(getOhteruserDetails(id));
  };

  const getMessage = (id) => {
    dispatch(getAllMessages(id));
  };

  const clearmsg = () => {
    dispatch(clearAllmsg());
  };

  return (
    <div
      className="msg-overlay-bubble__container-message-new"
      onClick={() => {
        clearmsg();
        openChat();
        findUser(user.reciever._id);
        getMessage(user._id);
      }}
    >
      <img src={img1} alt="" />
      <div className="msg-overlay-bubble__container-messages-info">
        <div className="msg-overlay-bubble__container-messages-header">
          <h4>
            {user && user.reciever.first_name + " "}
            {user && user.reciever.last_name}
          </h4>
          <span>{user && user.updatedAt.slice(0, 10)}</span>
        </div>
        <p>
          {user && user.message && user.message.length > maxlength
            ? user.message.substring(0, maxlength - 3) + "..."
            : user.message}
        </p>
      </div>
    </div>
  );
};

export default ChattingUsers;

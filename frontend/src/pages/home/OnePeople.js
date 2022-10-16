import React, { useEffect } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { connect } from "react-redux";
import { getChatUser } from "../../actions/chat";
import { clearError } from "../../actions/clearError";
import { notifyError } from "../../utils/Messages";

const OnePeople = (props) => {
  //get user details to chat
  const getToChat = (id) => { 
    if (
      props.people &&
      props.people._id === props.user &&
      props.user.user &&
      props.user.user._id
    ) {
      notifyError("you cat send message yourself!");
      return;
    } else {
      props.getDetails(id);
    }
  };

  return (
    <>
      {props.people ? (
        <div className="flex w-full items-center p-2 cursor-pointer hover:bg-gray-100 relative justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-[#58a0ffee] text-white mr-2 flex items-center justify-center uppercase font-bold relative overflow-hidden">
              {props.people && props.people.avatar ? (
                <img
                  src={props.people.avatar}
                  className="absolute top-0 left-0 object-contain h-full w-full"
                ></img>
              ) : (
                <>{props.people && props.people.username.slice(0, 1)}</>
              )}
            </div>
            <div>{props.people && props.people.username}</div>
          </div>
          <button
            className="w-fit absolut right-0 px-4 rounded bg-gradient-to-r from-green-500 to-green-400 text-white py-1"
            onClick={() => getToChat(props.people && props.people._id)}
          >
            <BsFillChatLeftTextFill />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  chatUser: state.Knowuser,
  user: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  getDetails: (id) => dispatch(getChatUser(id)),
  clear: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnePeople);

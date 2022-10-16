import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import MetaData from "../../utils/MetaData";
import Logo from "./Logo";
import Profile from "./Profile";
import AllPeoples from "./AllPeoples";
import Chat from "./Chat";
import FullLoader from "../../loader/FullLoader";
import { HiUserCircle } from "react-icons/hi";
import { getAllPeoples } from "../../actions/peoples";
import { clearError } from "../../actions/clearError";

const ChatPage = (props) => {
  const [open, setOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    props.getData();
  }, []);

  // //clear error
  useEffect(() => {
    if (props.peoples && props.peoples.error) {
      props.clear();
    }
  }, [props.peoples]);

  return (
    <>
      <MetaData title={"Chatapp"} />
      {props.user &&
      props.user.user &&
      props.user.user.username &&
      props.peoples &&
      props.peoples.peoples &&
      props.peoples.peoples.length ? (
        <div className="bg-[#add8e6] min-h-screen overflow-auto w-screen h-screen min-w-full p-14">
          <div className="h-full bg-white shadow-md rounded-md min-w-[1024px] w-full overflow-hidden">
            <div className="w-full flex justify-between h-full">
              <div className="w-[30%] border-r border-r-gray-300 h-full">
                <div className="left p-2 w-full border-b border-b-gray-300 flex items-center justify-between h-16">
                  <Logo />
                </div>
                <div className="h-[calc(100%-4rem)]">
                  <AllPeoples
                    user={props.user.user}
                    peoples={props.peoples.peoples}
                    onlineUsers={onlineUsers}
                  />
                </div>
              </div>

              <div className="w-[70%] h-full">
                <div className="w-full h-16 border border-l-0 flex justify-between items-center">
                  <div></div>
                  <button
                    className="justify-end items-center m-2 text-3xl rounded-full border h-8 w-8"
                    onClick={() => setOpen(true)}
                  >
                    <HiUserCircle />
                  </button>
                  <Profile
                    open={open}
                    close={() => setOpen(false)}
                    setOpen={setOpen}
                  />
                </div>
                <div className="w-full h-[calc(100%-4rem)]">
                  <Chat
                    onlineUsers={onlineUsers}
                    setOnlineUsers={setOnlineUsers}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FullLoader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
  peoples: state.Peoples,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getAllPeoples()),
  clear: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import { updateProfileAction } from "../../actions/profile";
import { UPDATE_PROFILE_RESET } from "../../constants/profile";
import { BiLogOut } from "react-icons/bi";
import { LOGOUT } from "../../constants/auth";
import { logoutUser } from "../../actions/logout";
import { useNavigate } from "react-router-dom";
import { BsCamera } from "react-icons/bs";
import UpdateProfileImage from "./UpdateProfileImage";
import { LOGIN } from "../../constants/urls";

const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logoutMe = async () => {
    props.resetRedux();
    props.logout();
    navigate(LOGIN);
  };

  return (
    <>
      {props.open && (
        <Dialog
          open={props.open}
          onClose={props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent style={{ padding: "0" }}>
            <div className={`w-96 max-w-[90%]p p-6`}>
              <div className="w-full relative flex flex-col">
                {/* profile image */}
                <div className="relative h-20 w-20 rounded-full border border-gray-400">
                  {props.user && props.user.user && props.user.user.avatar ? (
                    <img
                      src={props.user.user.avatar}
                      className="absolute top-0 left-0 h-full w-full object-contain"
                    />
                  ) : (
                    <></>
                  )}
                  <div
                    className="absolute top-0 right-0 h-5 w-6 hover:bg-gray-500 rounded duration-300 flex items-center justify-center hover:text-white font-semibold cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <BsCamera />
                  </div>
                  <UpdateProfileImage open={open} setOpen={setOpen} close={()=>setOpen(false)}/>
                </div>
                {/* profile username */}
                <div className="w-full p-3 text-[#526584] my-6 flex items-center cursor-pointer text-sm hover:bg-[#eee] font-semibold border rounded-3xl border-gray-400">
                  <div className="flex flex-col items-start">
                    <div className="text-base whitespace-nowrap text-black font-semibold">
                      {props.user &&
                        props.user.user &&
                        props.user.user.username}
                    </div>
                  </div>
                </div>

                {/* logout action button */}
                <button
                  className="w-full p-3 text-[#526584] flex items-center cursor-pointer text-sm hover:bg-[#eee] font-semibold border rounded-3xl border-gray-400"
                  onClick={() => logoutMe()}
                >
                  <BiLogOut
                    style={{
                      marginRight: ".5rem",
                      color: "black",
                      fontSize: "1.5rem",
                    }}
                  />
                  Logout
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.User,
  profile: state.Profile,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
  reset: () => dispatch({ type: UPDATE_PROFILE_RESET }),
  resetRedux: () => dispatch({ type: LOGOUT }),
  logout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

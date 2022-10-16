import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import { updateProfileAction } from "../../actions/profile";
import { UPDATE_PROFILE_RESET } from "../../constants/profile";
import { notifyError, notifySuccess } from "../../utils/Messages";
import { useState } from "react";
import Spinner from "../../loader/Spinner";

const UpdateProfileImage = (props) => {
  const [avatar, setAvatar] = useState("");
  //update proflie
  const updateNow = () => {
    if (!avatar) {
      notifyError("Please Enter image url!");
      return;
    }
    props.updateProfile({
      avatar,
    });
  };
  //show updated message
  useEffect(() => {
    if (props.profile && props.profile.isupdated) {
      notifySuccess("Your profile is updated!");
      props.setOpen(false);
      props.reset();
    }
  }, [props.profile]);

  //clear error
  useEffect(() => {
    if (props.profile && props.profile.error) {
      notifyError(props.profile.error);
      props.reset();
    }
  }, [props.profile]);

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
            <div
              className={`w-96 max-w-[90%]p p-6 ${
                props.profile && props.profile.loading && "cursor-progress"
              }`}
            >
              <div className="w-full">
                <textarea
                  type={"text"}
                  className="w-full p-2 border rounded border-gray-300"
                  placeholder="Profile image url..."
                  onChange={(e) => setAvatar(e.target.value)}
                />
                <button
                  className="w-32 bg-gradient-to-r from-fuchsia-600 to-violet-500 text-white h-10 rounded shadow mt-6"
                  onClick={updateNow}
                >
                  {props.profile && props.profile.loading ? (
                    <Spinner />
                  ) : (
                    <>save</>
                  )}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileImage);

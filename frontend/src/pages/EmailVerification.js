import React, { useState } from "react";
import { useEffect } from "react";
import { clearError } from "../actions/clearError";
import { verifyEmail } from "../actions/verifyEmail";
import { TOKEN } from "../constants";
import {
  getLocalData,
  removeLocalData,
  setLocalData,
} from "../hooks/localStorage";
import Spinner from "../loader/Spinner";
import { notifyError, notifySuccess } from "../utils/Messages";
import MetaData from "../utils/MetaData";
import { connect } from "react-redux";
import { VERIFY_EMAIL_RESET } from "../constants/auth";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../constants/urls"; 
import { authUser } from "../actions/auth";

const EmailVerification = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  //get email from localStorage
  const getEmailFromLocalStorge = async () => {
    const myEmail = await getLocalData(TOKEN);
    if (myEmail) {
      setEmail(myEmail);
    }
  };
  useEffect(() => {
    getEmailFromLocalStorge();
  }, []);

  //submit otp with email address
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6 || otp.length > 6) {
      notifyError("Please Enter a valid email!");
      return;
    }
    props.verifyOTP({ email, otp });
  };

  //clear error if error is available
  useEffect(() => {
    if (props.token && props.token.error) {
      notifyError(props.token.error);
      props.clear();
    }
  }, [props.token]);

  //verified page
  useEffect(() => {
    if (props.token && props.token.token && props.token.token.length) {
      notifySuccess("You are loggedin now!");
      removeLocalData(TOKEN);
      setLocalData(TOKEN, props.token.token);
      props.reset();
      navigate(HOME_PAGE);
    }
  }, [props.token]);

  //is authenticated
  useEffect(() => {
    if (props.user && props.user.isAuthenticated) {
      navigate(HOME_PAGE);
      props.auth();
    }
  }, [props.user]);

  return (
    <>
      <MetaData title={"Verify Email"} />
      <div className="w-full bg-[#fcf5ec] min-h-screen p-4 relative">
        <div className="w-[450px] mx-auto max-w-full rounded flex flex-col shadow-md my-8 bg-white">
          <div className="w-full pt-6">
            <h1 className="text-3xl  font-medium text-center text-[#45aba6] capitalize">
              Verify OTP
            </h1>
            <p className="text-[#616161] w-full text-center pt-2">
              We are sent you a opt on <strong>{email}</strong>
            </p>
          </div>
          <form className="w-full p-8" onSubmit={handleSubmit}>
            <div className="w-full mb-6 relative sm:mb-8 flex justify-between">
              <input
                type="text"
                name="otp"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full tracking-[1rem] sm:tracking-[2rem] text-center outline-none border border-gray-300 py-3 focus:border-black rounded-3xl"
              />
            </div>
            <button className="inline-block h-12 w-full bg-[#45aba6] text-white rounded-3xl font-semibold">
              {props.token && props.token.loading ? <Spinner /> : <>Submit</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.VerifyEmail,
  user: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  verifyOTP: (data) => dispatch(verifyEmail(data)),
  auth:()=>dispatch(authUser()),
  reset: () => dispatch({ type: VERIFY_EMAIL_RESET }),
  clear: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);

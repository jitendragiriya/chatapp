import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../utils/MetaData";
import { loginWithOTPAction } from "../actions/auth";
import { clearError } from "../actions/clearError";
import { connect } from "react-redux";
import { notifyError, notifySuccess } from "../utils/Messages";
import Spinner from "../loader/Spinner";
import { GENERATE_OTP_RESET } from "../constants/auth";
import { HOME_PAGE, VERIFY_EMAIL } from "../constants/urls";
import { setLocalData } from "../hooks/localStorage";
import { TOKEN } from "../constants";

const LoginPage = (props) => {
  const navigate = useNavigate();
  //inputs
  const [email, setEmail] = useState("");

  //submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      notifyError("Please Enter your email!");
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      notifyError("Please enter a valid email!");
      return;
    }
    props.login(email);
  };

  //show success message
  useEffect(() => {
    if (props.auth && props.auth.message && props.auth.message.message) {
      notifySuccess(props.auth.message.message);
      setLocalData(TOKEN, email);
      props.reset();
      navigate(VERIFY_EMAIL);
    }
  }, [props.auth]);

  //clear error
  useEffect(() => {
    if (props.auth && props.auth.error) {
      notifyError(props.auth.error);
      props.clear();
    }
  }, [props.auth]);

  //is authenticated
  useEffect(() => {
    if (props.user && props.user.isAuthenticated) {
      navigate(HOME_PAGE);
    }
  }, [props.user]);

  return (
    <>
      <MetaData title={"login"} />
      <div className="bg-[#fcf5ec] min-h-screen w-full p-4">
        <div className="w-[450px] max-w-full flex flex-col items-center mx-auto">
          <header className="p-4 text-xl font-semibold">
            <h1 className="text-3xl  font-medium text-center text-[#45aba6] capitalize">
              MyChat
            </h1>
          </header>
          <main className="bg-white shadow p-8 w-full rounded-md">
            <div className="">
              <h1 className="text-2xl mb-6 uppercase font-medium">Log in</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none border border-gray-300 p-3 focus:border-black rounded-3xl"
                  placeholder="Email"
                />
              </div>

              <button
                type="submit"
                className="inline-block h-12 w-full bg-[#45aba6] text-white rounded-3xl font-semibold mt-8"
              >
                {props.auth && props.auth.loading ? <Spinner /> : <>Login</>}
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
  user: state.User,
});

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginWithOTPAction(data)),
  clear: () => dispatch(clearError()),
  reset: () => dispatch({ type: GENERATE_OTP_RESET }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

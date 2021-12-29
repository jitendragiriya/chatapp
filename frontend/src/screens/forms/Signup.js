import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./allform.css";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { userRegister } from "../../reduxStore/actions/UserAction";
import MetaTitle from "../../utils/MetaTitle";
import { useSelector } from "react-redux";
import TopLoadinBar from "../../components/TopLoadinBar";
import { notifyError, notifySuccess } from "../../utils/Messages";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, isAuthenticated, progress } = useSelector(
    (state) => state.user
  );
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = inputs;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    dispatch(userRegister(formData));
  };

  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };

  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      notifySuccess(`${user.first_name} ${user.last_name} you accout created succussfully.`)
      navigate("/");
    }

    if (error) {
      notifyError(error);
    }
  }, [navigate,user, isAuthenticated, error]);
  return (
    <Fragment>
      <TopLoadinBar newProgress={progress} />
      <MetaTitle title="signup" />
      <div className="signup_page">
        <header className="signup_header">
          <Link to="/">
            <h1>Mywork</h1>
          </Link>
        </header>
        <main className="signup_main">
          <h1>Make the most of your professional life</h1>
          <div className="form_container">
            <form
              id="signup__form"
              className="formClass"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="form__control">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  onChange={onchange}
                  value={inputs.firstName}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form__control">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  onChange={onchange}
                  value={inputs.lastName}
                />
                <label htmlFor="LastName">Last Name</label>
              </div>
              <div className="form__control">
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  onChange={onchange}
                  value={inputs.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form__control password">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  className="password"
                  name="password"
                  required
                  onChange={onchange}
                  value={inputs.password}
                />
                <label htmlFor="password">Password</label>
                <span className="showhidePass" onClick={showPassword}>
                  show
                </span>
              </div>
              <div className="form__control password">
                <input
                  type={show ? "text" : "password"}
                  id="confirmPassword"
                  className="confirmPassword"
                  name="confirmPassword"
                  required
                  onChange={onchange}
                  value={inputs.confirmPassword}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
              <div className="form__control">
                <p className="user_policy">
                  By clicking agree & join, you agree the Mywork{" "}
                  <Link to="/">User Agreement, Privacy Policy,</Link> and{" "}
                  <Link to="/">Cookie Policy.</Link>
                </p>
              </div>
              <button className="formSubmitBtn">Agree & Join</button>
              <div className="login_options">or</div>
              <button className="login_with" type="submit">
                Sign in with google
              </button>
            </form>
            <h4 className="form__control">
              Already in Mywork?<Link to="/login"> Sign in</Link>
            </h4>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Signup;

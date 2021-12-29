import React, { Fragment, useEffect, useState } from "react";
import "./Login.css";
import "./allform.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../reduxStore/actions/UserAction";
import MetaTitle from "../../utils/MetaTitle";
import TopLoadinBar from "../../components/TopLoadinBar";
import { notifyError, notifySuccess } from "../../utils/Messages";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, isAuthenticated, progress } = useSelector(
    (state) => state.user
  );
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const showPassword = () => {
    setShow(!show);
  };

  const { email, password } = inputs;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    dispatch(userLogin(formData));
  };

  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      notifySuccess(`Welcome ${user.first_name} ${user.last_name}`);
      navigate("/");
    }
    if (error) {
      notifyError(error)
    }
  }, [isAuthenticated, navigate, user, error]);
  return (
    <Fragment>
      <MetaTitle title={"login"} />
      <TopLoadinBar newProgress={progress} />
      <div className="login_page">
        <header className="login_header">
          <Link to="/">
            <h1>Mywork</h1>
          </Link>
        </header>
        <main className="login_main">
          <div className="form_container">
            <div className="form__header">
              <h1>Sign in</h1>
              <p>Stay updated on your professional world</p>
            </div>
            <form
              id="login__form"
              className="formClass"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="form__control">
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  onChange={onchange}
                  value={inputs.email}
                />
                <label htmlFor="username">Email</label>
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
              <div className="form__control">
                <Link to="/password/forgot">forget password?</Link>
              </div>
              <button className="formSubmitBtn">Login</button>
              <div className="login_options">or</div>
              <button className="login_with">Sign in with google</button>
              <button className="login_with">sign in with facebook</button>
            </form>
          </div>
          <h4>
            New to Mywork?<Link to="/signup"> join now</Link>
          </h4>
        </main>
      </div>
    </Fragment>
  );
};

export default Login;

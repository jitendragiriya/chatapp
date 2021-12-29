import React, { Fragment, useEffect } from "react";
import "./App.css";
import store from "./reduxStore/store";
import Login from "./screens/forms/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./screens/forms/Signup";
import Header from "./components/Header";
import Home from "./screens/Home/Home";
import { isAlreadyLogedin } from "./reduxStore/actions/UserAction";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, progress } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(isAlreadyLogedin());
  }, []);
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Header /> <Home />
                  </>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </Fragment>
  );
}

export default App;

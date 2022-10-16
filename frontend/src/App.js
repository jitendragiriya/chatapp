import React, { useEffect } from "react";
import "./App.css";
import store from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import { HOME_PAGE, LOGIN, VERIFY_EMAIL } from "./constants/urls";
import { authUser } from "./actions/auth";
import ChatPage from "./pages/home/ChatPage";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import EmailVerification from "./pages/EmailVerification";

function App() {
  useEffect(() => {
    store.dispatch(authUser());
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={VERIFY_EMAIL} element={<EmailVerification />} />
          <Route path={HOME_PAGE} element={<ProtectedRoute />}>
            <Route path={HOME_PAGE} element={<ChatPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;

import React, { useState, useEffect, Fragment } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import img1 from "./number-3-three-260nw-742434955-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reduxStore/actions/UserAction";
import TopLoadinBar from "./TopLoadinBar";
import { notifyError, notifySuccess } from "../utils/Messages";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, isAuthenticated, progress, message } = useSelector(
    (state) => state.user
  );
  const [showmore, setshowmore] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const showMore = () => {
    setshowmore(!showmore);
  };
  if (showmore) {
    setTimeout(() => {
      setshowmore(!showmore);
    }, 20000);
  }

  const ClickHamburger = () => {
    setOpenHamburger(!openHamburger);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    const btn = document.querySelector(".global-nav__search-svg");
    const frm = document.querySelector(".global-nav__search-form");
    btn.addEventListener("click", function () {
      frm.classList.toggle("active");
    });

    if (message) {
      notifySuccess(message);
      navigate("/login");
    }
    if (error) {
      notifyError(error);
    }
  }, [navigate, message, error]);
  return (
    <Fragment>
      <TopLoadinBar newProgress={progress} />
      <header className="global-nav" id="global-nav">
        <div className="global-nav__content">
          <div className="global-nav__logo">
            <Link to="/">
              <h1>OT</h1>
            </Link>
          </div>
          <div className="global-nav__search">
            <form className="global-nav__search-form">
              <span className="global-nav__search-svg">
                <SearchIcon />
              </span>
              <input
                className="global-nav__search-input"
                id="search"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
          <div
            className={
              openHamburger ? "global-nav__nav nav__open" : "global-nav__nav"
            }
          >
            <Link to="/">
              <div className="nav__option">
                <span className="nav__option__icon">
                  <HomeIcon />
                </span>
                <span className="global-nav__primary-link-text">Home</span>
              </div>
            </Link>
            <Link to="/">
              <div className="nav__option">
                <span className="nav__option__icon">
                  <PeopleIcon />
                </span>
                <span className="global-nav__primary-link-text">
                  My Network
                </span>
              </div>
            </Link>
            <Link to="/">
              <div className="nav__option">
                <span className="nav__option__icon">
                  <WorkIcon />
                </span>
                <span className="global-nav__primary-link-text">Jobs</span>
              </div>
            </Link>
            <Link to="/">
              <div className="nav__option">
                <span className="nav__option__icon">
                  <MessageIcon />
                </span>
                <span className="global-nav__primary-link-text">Messaging</span>
              </div>
            </Link>
            <Link to="/">
              <div className="nav__option">
                <span className="nav__option__icon">
                  <NotificationsIcon />
                </span>
                <span className="global-nav__primary-link-text">
                  Notifications
                </span>
              </div>
            </Link>
            <div className="nav__option">
              <span onClick={showMore} className="nav__option__icon-user">
                <img src={img1} alt="" />
              </span>
              <div
                className={
                  showmore
                    ? "global-nav__user-more active"
                    : "global-nav__user-more"
                }
              >
                <div className="global-nav__user-more-about">
                  <span>
                    <img src={img1} alt="" />
                    <h4>Jitendra giriya</h4>
                  </span>
                  <Link to="/">
                    <button className="global-nav__user-view-profile-btn">
                      view profile
                    </button>
                  </Link>
                </div>
                <div className="global-nav__user-more-account">
                  <h3>Account</h3>
                  <Link to="/">
                    <span>Settings</span>
                  </Link>
                  <Link to="/">
                    <span>Help</span>
                  </Link>
                  <Link to="/">
                    <span>Privacy & Policy</span>
                  </Link>
                </div>
                <div className="global-nav__user-more-log">
                  <Link to="/">
                    <span onClick={handleLogout}>Log Out</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="nav__hamburger">
            <IconButton onClick={ClickHamburger}>
              {openHamburger ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;

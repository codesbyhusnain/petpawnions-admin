import React from "react";
import "./Navbar.css";
import Logo from "../../Assets/logo.png";
import Articles from "../../Assets/article-line.png";
import Map from "../../Assets/map-line.png";
import Event from "../../Assets/calendar-line.png";
import User from "../../Assets/user-fill.png";
import Settings from "../../Assets/tools-fill.png";
import Logout from "../../Assets/logout-fill.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Navbar = () => {
  const useAnalytics = (props) => {
    const link = useLocation();
    const activePage = link.pathname;
    return activePage;
  };
  return (
    <div className="navbar-container">
      <div>
        <img src={Logo} alt="logo" className="logo-sidebar" />
      </div>
      <div className="sidebar-body">
        <Link to="/articles" style={{ textDecoration: "none" }}>
          <div
            className={
              useAnalytics() === "/articles"
                ? "navbar-option active"
                : "navbar-option"
            }
          >
            <img
              src={Articles}
              alt="logo"
              className={
                useAnalytics() === "/articles"
                  ? "sidebar-icons active"
                  : "sidebar-icons"
              }
            />
            <p> Articles</p>
          </div>
        </Link>
        <Link to="/places" style={{ textDecoration: "none" }}>
          <div
            className={
              useAnalytics() === "/places"
                ? "navbar-option active"
                : "navbar-option"
            }
          >
            <img
              src={Map}
              alt="logo"
              className={
                useAnalytics() === "/places"
                  ? "sidebar-icons active"
                  : "sidebar-icons"
              }
            />
            <p>Pet Places</p>
          </div>
        </Link>
        <Link to="/events" style={{ textDecoration: "none" }}>
          <div
            className={
              useAnalytics() === "/events"
                ? "navbar-option active"
                : "navbar-option"
            }
          >
            <img
              src={Event}
              alt="logo"
              className={
                useAnalytics() === "/events"
                  ? "sidebar-icons active"
                  : "sidebar-icons"
              }
            />
            <p>Pet Events</p>
          </div>
        </Link>
        <div className="navbar-option">
          <img src={User} alt="logo" className="sidebar-icons" />
          <p>Users</p>
        </div>
        <div className="navbar-option">
          <img src={Settings} alt="logo" className="sidebar-icons" />
          <p>Settings</p>
        </div>
        <Link to="/login">
          <div className="navbar-option">
            <img src={Logout} alt="logo" className="sidebar-icons" />
            <p>Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

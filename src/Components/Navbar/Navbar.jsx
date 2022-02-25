import React from "react";
import "./Navbar.css";
import Logo from "../../Assets/logo.png";
import Articles from "../../Assets/article-line.png";
import Map from "../../Assets/map-line.png";
import Event from "../../Assets/calendar-line.png";
import User from "../../Assets/user-fill.png";
import Settings from "../../Assets/tools-fill.png";
import Logout from "../../Assets/logout-fill.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div>
        <img src={Logo} alt="logo" className="logo-sidebar" />
      </div>
      <div className="sidebar-body">
        <div className="navbar-option active">
          <img src={Articles} alt="logo" className="sidebar-icons active" />
          <p> Articles</p>
        </div>
        <div className="navbar-option">
          <img src={Map} alt="logo" className="sidebar-icons" />
          <p>Pet Places</p>
        </div>
        <div className="navbar-option">
          <img src={Event} alt="logo" className="sidebar-icons" />
          <p>Pet Events</p>
        </div>
        <div className="navbar-option">
          <img src={User} alt="logo" className="sidebar-icons" />
          <p>Users</p>
        </div>
        <div className="navbar-option">
          <img src={Settings} alt="logo" className="sidebar-icons" />
          <p>Settings</p>
        </div>
        <div className="navbar-option">
          <img src={Logout} alt="logo" className="sidebar-icons" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";

import { Link } from "react-router-dom";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import { AuthContext } from "../../AuthContext";

//Import logo Images

import Logo from "./logo.png";

const Header = () => {
  const { token } = useContext(AuthContext);
  const [jwtToken, setJwtToken] = token;
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="#" className="logo logo-light">
                <span className="logo-lg">
                  <img src={Logo} alt="" height="50" />
                </span>
              </Link>
            </div>
          </div>

          <div className="d-flex">
            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;

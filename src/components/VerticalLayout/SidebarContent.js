import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Auth from "../../Auth";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";

class SidebarContent extends Component {
  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.type !== prevProps.type) {
        this.initMenu();
      }
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to="/articles" className=" waves-effect">
                <i className="ri-article-line"></i>
                <span className="ms-1">{this.props.t("Articles")}</span>
              </Link>
            </li>

            <li>
              <Link to="/petevents" className=" waves-effect">
                <i className="ri-calendar-event-fill"></i>
                <span className="ms-1">{this.props.t("Events")}</span>
              </Link>
            </li>

            <li>
              <Link to="/petplaces" className=" waves-effect">
                <i className="ri-map-pin-5-fill"></i>
                <span className="ms-1">{this.props.t("Places")}</span>
              </Link>
            </li>

            <li>
              <Link to="/appusers" className=" waves-effect">
                <i className="ri-user-fill"></i>
                <span className="ms-1">{this.props.t("App User")}</span>
              </Link>
            </li>
            <li>
              <Link to="/adminusers" className=" waves-effect">
                <i class="ri-shield-user-fill"></i>
                <span className="ms-1">{this.props.t("Admin User")}</span>
              </Link>
            </li>

            <li>
              <Link to="#" className=" waves-effect">
                <i className="ri-tools-fill"></i>
                <span className="ms-1">{this.props.t("Settings")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className=" waves-effect"
                onClick={() => {
                  Auth.logout();
                  localStorage.setItem("jwtToken", "");
                }}
              >
                <i class="ri-logout-box-line"></i>
                <span className="ms-1">{this.props.t("Logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withNamespaces()(SidebarContent))
);

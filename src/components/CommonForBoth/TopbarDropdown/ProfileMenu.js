import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";

// users
import avatar2 from "../../../assets/images/users/avatar-2.jpg";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  render() {
    let username = "Admin";
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      const uNm = obj.email.split("@")[0];
      username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
    }

    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block user-dropdown"
        >
          <DropdownToggle
            tag="button"
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
          >
            <span className="d-none d-xl-inline-block ms-1 text-transform">
              {username}
            </span>
          </DropdownToggle>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(ProfileMenu);

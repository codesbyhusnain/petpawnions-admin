import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { AuthContext } from "./AuthContext";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import { Route } from "react-router-dom";
import Auth from "./Auth";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

class App extends Component {
  static authContext = AuthContext;

  constructor(props) {
    super(props);
    this.getLayout = this.getLayout.bind(this);
  }

  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);

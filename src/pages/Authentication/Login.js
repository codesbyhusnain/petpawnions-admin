import React, { useState, useContext, useEffect } from "react";

import {
  Row,
  Col,
  Button,
  Container,
  Label,
  UncontrolledAlert,
} from "reactstrap";
import Axios from "axios";

import ForgetPasswordPage from "./ForgetPassword";
import { AuthContext } from "../../AuthContext";
import Auth from "../../Auth";

// Redux

import { Link, Redirect } from "react-router-dom";
import AdminUserPool from "./AdminUserPool";
import AuthorUserPool from "./AuthorUserPool";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// import images
import Logo from "./logo.png";

import "./RegisterAdmin.scss";

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Login = () => {
  const { token, authProtect } = useContext(AuthContext);
  const [jwtToken, setJwtToken] = token;
  const [authProtected, setAuthProtected] = authProtect;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState();
  const [authorLoggedIn, setAuthorLoggedIn] = useState();
  const [redirect, setRedirect] = useState(false);
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState("");

  // const adminLogin = (event) => {
  //   event.preventDefault();

  //   const adminUser = new CognitoUser({
  //     Username: email,
  //     Pool: AdminUserPool,
  //   });

  //   const adminAuthDetails = new AuthenticationDetails({
  //     Username: email,
  //     Password: password,
  //   });

  //   adminUser.authenticateUser(adminAuthDetails, {
  //     onSuccess: (data) => {
  //       setAdminLoggedIn(true);
  //     },
  //     onFailure: (err) => {
  //       setAdminLoggedIn(false);
  //     },
  //     newPasswordRequired: (data) => {},
  //   });
  // };

  const loginInfo = {
    name: email,
    password: password,
  };

  const authApi = "http://3.15.82.201:3000/api/auth/login";
  const userAuth = (e) => {
    e.preventDefault();
    Axios.post(authApi, loginInfo).then((res) => {
      localStorage.setItem("jwtToken", res.data.idToken.jwtToken);
      setJwtToken(res.data.idToken.jwtToken);
      Auth.login();
      setAdminLoggedIn(true);
    });
  };

  useEffect(() => {
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("authProtected", authProtected);
  }, [jwtToken, authProtected]);

  const authorLogin = (event) => {
    event.preventDefault();

    const authorUser = new CognitoUser({
      Username: email,
      Pool: AuthorUserPool,
    });

    const authorAuthDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    authorUser.authenticateUser(authorAuthDetails, {
      onSuccess: (data) => {
        setAuthorLoggedIn(true);
      },
      onFailure: (err) => {
        setAuthorLoggedIn(false);
      },
      newPasswordRequired: (data) => {},
    });
  };

  // console.log(Auth.isAuthProtected());
  console.log(localStorage.getItem("jwtToken"));

  return (
    <React.Fragment>
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col lg={4}>
            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div className="w-100">
                <Row className="justify-content-center">
                  <Col lg={9}>
                    <div>
                      <div className="text-center">
                        <div>
                          <img
                            src={Logo}
                            alt=""
                            height="100"
                            class="auth-logo logo-dark mx-auto"
                          />
                        </div>

                        <h4 className="font-size-18 mt-4">Welcome Back!</h4>
                        <p className="text-muted">
                          Sign in to continue to Pet Pawnions.
                        </p>
                      </div>
                      {step === 0 ? (
                        <h1>
                          <div
                            className="user-type"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Button
                              color="success"
                              className="w-md waves-effect waves-light"
                              type="submit"
                              onClick={() => {
                                setUserType("Admin");
                                setStep(1);
                              }}
                            >
                              Log In as an Admin
                            </Button>
                            <h2
                              style={{
                                width: "100%",
                                textAlign: "center",
                                borderBottom: "1px solid #9A9483",
                                lineHeight: "0.1em",
                                margin: "20px 0 25px",
                                opacity: "50%",
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor: "#f0f5f7",
                                  padding: "0 15px",
                                  fontSize: "12px",
                                }}
                              >
                                OR
                              </span>
                            </h2>
                            <Button
                              color="primary"
                              className="w-md waves-effect waves-light"
                              type="submit"
                              onClick={() => {
                                setUserType("Author");
                                setStep(1);
                              }}
                            >
                              Log In as an Author
                            </Button>
                          </div>
                        </h1>
                      ) : null}
                      {step === 1 ? (
                        <div className="login-flow">
                          {adminLoggedIn ? (
                            <div>
                              {setTimeout(() => {
                                setRedirect(true);
                              }, 2000)}
                              {redirect ? <Redirect to="/articles" /> : null}
                            </div>
                          ) : null}
                          {adminLoggedIn === false ? (
                            <UncontrolledAlert
                              color="danger"
                              className="alert-dismissible fade show"
                              role="alert"
                            >
                              <i className="mdi mdi-alert-outline me-2"></i>
                              Authentication failed! Please try again
                            </UncontrolledAlert>
                          ) : null}
                          {authorLoggedIn ? (
                            <div>
                              {setTimeout(() => {
                                setRedirect(true);
                              }, 2000)}
                              {redirect ? <Redirect to="/dashboard" /> : null}
                            </div>
                          ) : null}
                          {authorLoggedIn === false ? (
                            <UncontrolledAlert
                              color="danger"
                              className="alert-dismissible fade show"
                              role="alert"
                            >
                              <i className="mdi mdi-alert-outline me-2"></i>
                              Authentication failed! Please try again
                            </UncontrolledAlert>
                          ) : null}

                          <div className="p-2 mt-5">
                            <AvForm className="form-horizontal">
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Email</Label>
                                <AvField
                                  name="email"
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  placeholder="Enter username"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>

                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <AvField
                                  name="password"
                                  type="password"
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>

                              <div
                                className="mt-4 text-center"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                {userType === "Admin" ? (
                                  <Button
                                    color="success"
                                    className="w-md waves-effect waves-light"
                                    type="submit"
                                    onClick={userAuth}
                                  >
                                    Log In
                                  </Button>
                                ) : null}
                                {userType === "Author" ? (
                                  <Button
                                    color="primary"
                                    className="w-md waves-effect waves-light"
                                    type="submit"
                                    onClick={authorLogin}
                                  >
                                    Log In
                                  </Button>
                                ) : null}
                              </div>

                              <div
                                className="mt-4 text-center"
                                onClick={() => setStep(3)}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="mdi mdi-lock me-1"></i> Forgot
                                your password?
                              </div>
                            </AvForm>
                          </div>
                        </div>
                      ) : null}
                      {step === 3 && userType !== "" ? (
                        <ForgetPasswordPage user={userType} />
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="authentication-bg">
              <div className="bg-overlay"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;

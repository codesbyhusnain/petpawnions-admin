import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Label,
  UncontrolledAlert,
} from "reactstrap";

import AuthorUserPool from "./AuthorUserPool.js";

import { CognitoUser } from "amazon-cognito-identity-js";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import "./RegisterAdmin.scss";

// Redux
import { Link, Redirect } from "react-router-dom";

// import images
import logodark from "../../assets/images/logo-dark.png";

const RegisterAdmin = () => {
  //FIELD DATA
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");

  //FLAGS
  const [code, setCode] = useState("");
  const [step, setStep] = useState(0);
  const [otpSuccess, setOtpSuccess] = useState();
  const [redirect, setRedirect] = useState(false);

  // const poolData = {
  //   UserPoolId: "ap-south-1_laNRncKhd",
  //   ClientId: "hd1ls0cm7qr9r6vaimtnvv4l0",
  // };

  // const UserPool = new CognitoUserPool(poolData);

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: AuthorUserPool,
  });

  const signUp = (event) => {
    event.preventDefault();

    AuthorUserPool.signUp(email, password, [], null, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      if (data) {
        setStep(1);
      }
    });
  };

  const confirmSignup = (event) => {
    event.preventDefault();
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        alert(err.message || JSON.stringify(err));
        setOtpSuccess(false);
        return;
      }
      if (result.toString() === "SUCCESS") {
        setOtpSuccess(true);
      }
    });
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={5} style={{ overflow: "scroll" }}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div style={{ marginTop: "80%" }}>
                            <Link to="#" className="logo">
                              <img src={logodark} height="20" alt="logo" />
                              {step === 0 ? (
                                <h4 className="font-size-18 mt-4">
                                  Register Your Author Account
                                </h4>
                              ) : (
                                <h4 className="font-size-18 mt-4">
                                  Verify your Email
                                </h4>
                              )}
                            </Link>
                          </div>
                        </div>
                        {step === 0 ? (
                          <div className="p-2 mt-5">
                            <AvForm>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-user-3-line auti-custom-input-icon"></i>
                                <Label htmlFor="useremail">Full Name</Label>
                                <AvField
                                  name="firstname"
                                  validate={{ required: true }}
                                  type="text"
                                  className="form-control"
                                  id="firstname"
                                  placeholder="Enter your full name"
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>

                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                <Label htmlFor="useremail">Email</Label>
                                <AvField
                                  name="email"
                                  validate={{ email: true, required: true }}
                                  type="email"
                                  className="form-control"
                                  id="useremail"
                                  placeholder="Enter your email"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-phone-line auti-custom-input-icon"></i>
                                <Label>Mobile</Label>
                                <AvField
                                  name="text"
                                  type="text"
                                  placeholder="Enter your phone"
                                  validate={{
                                    pattern: {
                                      value: "^[0-9]+$",
                                    },
                                  }}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-lock-line auti-custom-input-icon"></i>
                                <Label htmlFor="useremail">Password</Label>
                                <AvField
                                  name="password"
                                  placeholder="Enter your password"
                                  type="password"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-lock-line auti-custom-input-icon"></i>
                                <Label htmlFor="useremail">
                                  Confirm Password
                                </Label>
                                <AvField
                                  name="password"
                                  placeholder="Confirm your password"
                                  type="password"
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-home-line auti-custom-input-icon"></i>
                                <Label>Address</Label>
                                <AvField
                                  name="text"
                                  type="text"
                                  placeholder="Enter your address"
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-mail-send-line auti-custom-input-icon"></i>
                                <Label>Postal Code</Label>
                                <AvField
                                  name="text"
                                  type="text"
                                  placeholder="Enter your postal code"
                                  onChange={(e) =>
                                    setPostalCode(e.target.value)
                                  }
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-building-4-line auti-custom-input-icon"></i>
                                <Label>City</Label>
                                <AvField
                                  name="text"
                                  type="text"
                                  placeholder="Enter your phone"
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </div>
                              <div className="auth-form-group-custom mb-4">
                                <i className="ri-building-line auti-custom-input-icon"></i>
                                <Label>County</Label>
                                <AvField
                                  name="text"
                                  type="text"
                                  placeholder="Enter your phone"
                                  onChange={(e) => setCounty(e.target.value)}
                                />
                              </div>

                              <div className="text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                  onClick={signUp}
                                >
                                  Register
                                </Button>
                              </div>

                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  By registering you agree to the Nazox
                                  <Link to="#" className="text-primary">
                                    {" "}
                                    Terms of Use
                                  </Link>
                                </p>
                              </div>
                            </AvForm>
                          </div>
                        ) : (
                          <div className="verify-form">
                            <div className="verify-info-container">
                              <p
                                className="verify-info"
                                style={{ textAlign: "center" }}
                              >
                                We have sent an OTP (One Time Password) to you.
                                Please enter the code below to continue
                              </p>
                              {otpSuccess ? (
                                <div>
                                  <UncontrolledAlert
                                    color="success"
                                    className="alert-dismissible fade show"
                                    role="alert"
                                  >
                                    <i className="mdi mdi-check-all me-2"></i>
                                    OTP Verified! You will be redirected to
                                    login!
                                  </UncontrolledAlert>
                                  {setTimeout(() => {
                                    setRedirect(true);
                                  }, 2000)}
                                  {redirect ? <Redirect to="/login" /> : null}
                                </div>
                              ) : null}
                            </div>
                            <div className="divOuter">
                              <div className="divInner">
                                <input
                                  className="resend-code-input"
                                  type="text"
                                  maxLength={6}
                                  onChange={(e) => setCode(e.target.value)}
                                />
                              </div>
                            </div>
                            <p
                              className="resend-code"
                              style={{ textAlign: "center" }}
                            >
                              Resend Code
                            </p>
                            <div className="continue-button">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                                onClick={confirmSignup}
                              >
                                Continue
                              </Button>
                            </div>
                            <p
                              className="cancel-button"
                              onClick={() => {
                                setStep(0);
                              }}
                            >
                              {" "}
                              Cancel{" "}
                            </p>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className="authentication-bg">
                <div className="bg-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RegisterAdmin;

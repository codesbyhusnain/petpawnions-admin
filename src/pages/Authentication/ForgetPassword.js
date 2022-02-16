import React, { useState } from "react";
import { Button, Label, UncontrolledAlert, Input } from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation";
import AdminUserPool from "./AdminUserPool";
import "./RegisterAdmin.scss";

import { CognitoUser } from "amazon-cognito-identity-js";

const ForgetPasswordPage = (props) => {
  const [step, setStep] = useState(0);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [codeSentError, setCodeSentError] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState();
  const [code, setCode] = useState("");
  const [passMismatch, setPassMismatch] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState();

  const notMatch = "Passwords do not match";

  const sendAdminCode = (event) => {
    event.preventDefault();

    getAdminUser().forgotPassword({
      onSuccess: (data) => {
        console.log("Success");
      },
      onFailure: (err) => {
        setCodeSentError(true);
        console.log(err);
      },
      inputVerificationCode: (data) => {
        console.log("Sent the code");
        setStep(1);
      },
    });
  };

  const getAdminUser = () => {
    return new CognitoUser({
      Username: resetEmail,
      Pool: AdminUserPool,
    });
  };

  const resetAdminPassword = (event) => {
    event.preventDefault();

    getAdminUser().confirmPassword(code, resetPassword, {
      onSuccess: (data) => {
        setChangeSuccess(true);
        window.location.reload();
      },
      onFailure: (err) => {
        setChangeSuccess(false);
        console.log(err);
      },
    });
  };

  return (
    <div>
      {step === 0 ? (
        <div className="p-2 mt-5">
          <AvForm className="form-horizontal">
            {codeSentError ? (
              <div>
                <UncontrolledAlert
                  color="danger"
                  className="alert-dismissible fade show"
                  role="alert"
                >
                  <i className="mdi mdi-alert-outline me-2"></i>
                  OTP not sent! Try again
                </UncontrolledAlert>
              </div>
            ) : null}
            <div className="auth-form-group-custom mb-4">
              <i className="ri-mail-line auti-custom-input-icon"></i>
              <Label htmlFor="useremail">Email</Label>
              <AvField
                name="useremail"
                type="email"
                validate={{ email: true, required: true }}
                className="form-control"
                id="useremail"
                placeholder="Enter email"
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <div className="mt-4 text-center">
              <Button
                color="primary"
                className="w-md waves-effect waves-light"
                type="submit"
                onClick={sendAdminCode}
              >
                Send Code
              </Button>
            </div>
          </AvForm>
        </div>
      ) : (
        <div className="verify-form">
          <div className="verify-info-container">
            <p className="verify-info" style={{ textAlign: "center" }}>
              We have sent an OTP (One Time Password) to you. Please enter the
              code and your new password below to continue
            </p>
            {changeSuccess ? (
              <div>
                <UncontrolledAlert
                  color="success"
                  className="alert-dismissible fade show"
                  role="alert"
                >
                  <i className="mdi mdi-check-all me-2"></i>
                  Password Changed Successfully!
                </UncontrolledAlert>
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

          <p className="resend-code" style={{ textAlign: "center" }}>
            Resend Code
          </p>
          <AvForm className="form-horizontal">
            <div className="auth-form-group-custom mb-4">
              <i className="ri-lock-line auti-custom-input-icon"></i>
              <Label htmlFor="useremail">Password</Label>
              <AvField
                name="password"
                type="password"
                validate={{ required: true }}
                className="form-control"
                id="useremail"
                placeholder="Enter new password"
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className="auth-form-group-custom mb-4">
              <i className="ri-lock-line auti-custom-input-icon"></i>
              <Label htmlFor="useremail">Confirm Password</Label>
              <AvField
                name="password"
                type="password"
                validate={{ required: true }}
                className="form-control"
                id="useremail"
                placeholder="Confirm your password"
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            {passMismatch ? <p style={{ color: "red" }}> {notMatch} </p> : null}
          </AvForm>
          <div className="continue-button">
            {props.user === "Admin" ? (
              <Button
                color="primary"
                className="w-md waves-effect waves-light"
                type="submit"
                onClick={resetAdminPassword}
              >
                Continue
              </Button>
            ) : (
              <Button
                color="primary"
                className="w-md waves-effect waves-light"
                type="submit"
                onClick={() => console.log("Wrong button")}
              >
                Continue
              </Button>
            )}
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
  );
};

export default ForgetPasswordPage;

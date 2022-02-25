import React, { useState } from "react";
import Background from "../../Assets/forgot-bg.png";
import Logo from "../../Assets/logo.png";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [email, setEmail] = useState("");
  const statusStyle = {
    color: "red",
    fontSize: "15px",
    fontWeight: "600",
    position: "absolute",
    margin: "auto",
    width: "100%",
    textAlign: "center",
  };

  const validateEmail = (email) => {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return true;
    } else {
      setStatusMessage("Please enter a proper email ");
      return false;
    }
  };

  const ForgotPassword = () => {
    if (validateEmail()) {
      console.log("Email sent");
    }
  };

  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        position: "fixed",
      }}
    >
      <div className="login-container">
        <div className="login-body">
          <img src={Logo} alt="Logo" className="login-logo" />
          <h1 className="login-heading">
            Hello there!{" "}
            <p style={{ fontSize: "15px", fontWeight: "200" }}>
              Please provide your credentials and continue
            </p>{" "}
            <p style={statusStyle}>{statusMessage}</p>
          </h1>
          <div className="login-credentials">
            <input
              placeholder="Enter your Email..."
              className="login-input"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="login-button" onClick={ForgotPassword}>
              Reset Password
            </button>
            <Link to="/login" className="forgot-password">
              <p>Back to login </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

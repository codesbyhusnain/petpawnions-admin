import React, { useState } from "react";
import "./Login.css";
import Background from "../../Assets/login-bg.png";
import Logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [statusMessage, setStatusMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const baseUrl = "http://3.15.82.201:3000/api/v1/auth/login";

  const statusStyle = {
    color: loginStatus ? "green" : "red",
    fontSize: "15px",
    fontWeight: "600",
    position: "absolute",
    margin: "auto",
    width: "100%",
    textAlign: "center",
  };

  const loginInfo = {
    name: email,
    password: password,
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
  const validatePassword = (pass) => {
    if (pass.length < 1) {
      setStatusMessage("Please enter your password!");
      return false;
    } else {
      return true;
    }
  };

  const validateData = () => {
    if (validateEmail(email) && validatePassword(password)) {
      return true;
    } else {
      return false;
    }
  };

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const Login = () => {
    setStatusMessage("");
    if (validateData()) {
      axios
        .post(baseUrl, loginInfo)
        .then((res) => {
          setStatusMessage("Login Successful!");
          setLoginStatus(true);
        })
        .catch((err) => {
          setStatusMessage(err.response.data.message);
          setLoginStatus(false);
        });
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
        {state === 0 ? (
          <div className="choice-body">
            {" "}
            <img src={Logo} alt="Logo" className="login-logo" />
            <h1 className="login-heading">
              Welcome back!{" "}
              <p style={{ fontSize: "15px", fontWeight: "200" }}>
                Please choose your desired login
              </p>{" "}
            </h1>
            <div className="login-choice">
              <button className="admin-button" onClick={() => setState(1)}>
                Login as Admin
              </button>
              <h2 className="or-line">
                <span className="or-text">OR</span>
              </h2>
              <button className="author-button" onClick={() => setState(1)}>
                Login as Author
              </button>
            </div>
          </div>
        ) : (
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
              <input
                placeholder="Enter your Password..."
                className="login-input"
                type={passwordType}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                {" "}
                <input type="checkbox" onClick={togglePasswordVisibility} />
                Show Password
              </div>

              <button className="login-button" onClick={Login}>
                Login
              </button>
              <Link to="/forgotpassword" className="forgot-password">
                <p>Forgot Password? </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

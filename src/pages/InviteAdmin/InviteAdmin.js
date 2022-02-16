import React, { useState } from "react";
import { Card, Col, Row, Button, Label, Input } from "reactstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";

const AdminUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const sender = "husnain.mehmood@neuralsoftsolutions.com";

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(
    "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"
  );
  const msg = {
    to: email, // Change to your recipient
    from: sender, // Change to your verified sender
    subject: "Create your account!",
    text: `Hello ${
      (firstname, " ", lastname)
    }, Go to http://localhost:3002/inviteadmin to create your account.`,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const sendMail = () => {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <div className="invite-admin" style={{ marginTop: "10%" }}>
        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8%",
          }}
        >
          <Col className="col-10">
            <Card style={{ padding: "50px" }}>
              <h1
                style={{
                  fontFamily: "Avenir",
                  textAlign: "center",
                  marginBottom: "50px",
                }}
              >
                Invite an Admin
              </h1>
              <Row className="mb-3">
                <Label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  First Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    placeholder="First Name"
                    id="example-url-input"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  Last Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    id="example-url-input"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Label
                  htmlFor="example-url-input"
                  className="col-md-2 col-form-label"
                >
                  Email
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    id="example-url-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>

              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link to="adminusers">
                  <Button
                    color="light"
                    type="button"
                    className="waves-effect waves-light me-1"
                  >
                    <i className="ri-close-line align-middle me-2"></i> Cancel
                  </Button>
                </Link>
                <Button
                  color="success"
                  type="button"
                  className="waves-effect waves-light me-1"
                  style={{ marginLeft: "10px" }}
                  onClick={sendMail}
                >
                  <i className="ri-mail-send-line align-middle me-2"></i> Send
                  the Invite
                </Button>
              </div>
            </Card>
          </Col>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminUser;

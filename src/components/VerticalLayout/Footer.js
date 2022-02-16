import React from "react";
import { Row, Col, Container } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © Pet Pawnions.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                <i class="ri-code-box-line"></i> Powered by Neural Soft
                Solutions
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

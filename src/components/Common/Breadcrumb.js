import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";

class Breadcrumbs extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={12}>
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">{this.props.t(this.props.title)}</h4>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(Breadcrumbs);

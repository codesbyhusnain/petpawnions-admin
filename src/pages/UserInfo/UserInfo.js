import React, { useState } from "react";
import { Card, Col, CardBody, Table } from "reactstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import User from "./user.png";
import "./UserInfo.scss";

const AdminUser = () => {
  return (
    <React.Fragment>
      <div
        className="page-content"
        style={{
          backgroundColor: "#ffffff",
          margin: "auto",
        }}
      >
        <img
          src={User}
          alt="user"
          style={{
            width: "15%",
            display: "block",
            margin: "auto",
          }}
        />
        <div>
          <div className="table-section">
            {" "}
            <h3 className="heading-info"> Personal Info </h3>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table striped className=" mb-0">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>user@mdo.com</td>
                          <td>03246101715</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
          <div className="table-section">
            <h3 className="heading-info">Address</h3>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table striped className=" mb-0">
                      <thead>
                        <tr>
                          <th>Address Line 1</th>
                          <th>Address Line 2</th>
                          <th>City</th>
                          <th>Country</th>
                          <th>Postal Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>346-B PUEHS</td>
                          <td>ABDUR SATTAR EDHI</td>
                          <td>LAHORE</td>
                          <td>PAKISTAN</td>
                          <td>54000</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
          <div className="table-section">
            {" "}
            <h3 className="heading-info">Pet Profile</h3>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table striped className=" mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Size</th>
                          <th>Breed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Mike</td>
                          <td>Dog</td>
                          <td>Huge</td>
                          <td>GSD</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
          <div className="table-section">
            {" "}
            <h3 className="heading-info">Order History</h3>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table striped className=" mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Order Number</th>
                          <th>Order Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminUser;

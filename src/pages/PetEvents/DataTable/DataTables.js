import React, { useState, Fragment, useContext, useEffect } from "react";
import { UncontrolledAlert } from "reactstrap";
import Loading from "./loading.gif";
import Axios from "axios";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Container,
} from "reactstrap";

import ReadOnly from "./ReadOnly";

import { EventsContext } from "../PetEventsContext";

import "./DataTables.css";

const DataTable = ({ token }) => {
  //CONTEXT DATA
  const { events, state, columns } = useContext(EventsContext);
  const [eventsValue, setEventsValue] = events;
  const [stateValue, setStateValue] = state;
  const columnsValue = columns;

  //EVENT CREATIION DATA
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [s3File, setS3File] = useState("");

  //SEARCH & EDIT DATA
  const [searchParam, setSearchParam] = useState("");

  const [id, setId] = useState("");
  const [titleE, setTitleE] = useState("");
  const [addressE, setAddressE] = useState("");
  const [startTimeE, setStartTimeE] = useState("");
  const [endTimeE, setEndTimeE] = useState("");
  const [postalCodeE, setPostalCodeE] = useState("");
  const [urlE, setUrlE] = useState("");
  const [detailsE, setDetailsE] = useState("");
  const [categoryE, setCategoryE] = useState("");
  const [editImage, setEditImage] = useState("");

  //FLAGS
  const [createFieldsFilled, setCreateFieldsFilled] = useState(null);
  const [editFieldsFilled, setEditFieldsFilled] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const getEventUrl = "http://18.216.174.90:3000/api/event";

  //EXPORTED FUNCTIONS
  const deleteEventStatus = (e) => {
    setDeleteSuccess(e);
  };
  const setEditState = () => {
    setStateValue(2);
  };
  const getEditId = (e) => {
    setId(e);
  };
  const getEditTitle = (e) => {
    setTitleE(e);
  };
  const getEditAddress = (e) => {
    setAddressE(e);
  };
  const getStartTime = (e) => {
    setStartTimeE(e);
  };
  const getEndTime = (e) => {
    setEndTimeE(e);
  };
  const getPostalCode = (e) => {
    setPostalCodeE(e);
  };
  const getEditUrl = (e) => {
    setUrlE(e);
  };
  const getEditLocation = (e) => {
    setCategoryE(e);
  };
  const getEditDetails = (e) => {
    setDetailsE(e);
  };
  const getEditImage = (e) => {
    setEditImage(e);
  };

  //CREATE EVENT DATA

  const checkCreateFields = () => {
    if (
      title === "" ||
      address === "" ||
      startTime === "" ||
      endTime === "" ||
      postalCode === "" ||
      category === "" ||
      category === "Select a Category" ||
      url === "" ||
      file === null ||
      details === ""
    ) {
      setCreateFieldsFilled(false);
    } else {
      setCreateFieldsFilled(true);
    }
  };
  const checkEditFields = () => {
    if (
      titleE === "" ||
      addressE === "" ||
      startTimeE === "" ||
      endTimeE === "" ||
      postalCodeE === "" ||
      categoryE === "" ||
      categoryE === "Select a Category" ||
      urlE === "" ||
      detailsE === ""
    ) {
      setEditFieldsFilled(false);
    } else {
      setEditFieldsFilled(true);
    }
  };

  const apiUrl = "http://3.15.82.201:3000";
  const createUrl = `${apiUrl}/api/event`;
  const imgUrl = `${apiUrl}/api/user/upload`;
  const editUrl = `${apiUrl}/api/event/${id}`;

  const imgConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fileSelectHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    const image = new FormData();
    if (file !== null) {
      image.append("file", file, file.name);
      console.log(image);
      Axios.post(imgUrl, image, imgConfig)
        .then((response) => {
          console.log(response);
          setS3File(response.data.key);
        })
        .catch((err) => console.log("error: " + err));
    }
  };

  const createEventData = {
    pic: s3File,
    title: title,
    start_time: startTime,
    end_time: endTime,
    postal_code: postalCode,
    location: address,
    url: url,
    event_type: category,
    detail: details,
    createdAt: "2021-11-15T12:15:39.658Z",
  };
  const editEventData = {
    pic: editImage,
    title: titleE,
    start_time: startTimeE,
    end_time: endTimeE,
    postal_code: postalCodeE,
    location: addressE,
    url: urlE,
    event_type: categoryE,
    detail: detailsE,
    createdAt: "2021-11-15T12:15:39.658Z",
  };

  const editEvent = (e) => {
    e.preventDefault();
    checkEditFields();
    Axios.put(editUrl, editEventData, config)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => console.log("error: " + err));
  };

  const createEvent = (e) => {
    e.preventDefault();
    checkCreateFields();
    Axios.post(createUrl, createEventData, config)
      .then((response) => {
        window.location.reload(true);
        console.log(response);
      })
      .catch((err) => console.log("error: " + err));
  };

  const styles = {
    borderColor: "red",
  };

  const filteredData = eventsValue.filter((article) =>
    article.title.toLowerCase().includes(searchParam.toLowerCase())
  );

  return (
    <div className="app-container">
      {deleteSuccess === true ? (
        <UncontrolledAlert color="primary">
          Event deleted sucessfully
        </UncontrolledAlert>
      ) : null}
      {deleteSuccess === false ? (
        <UncontrolledAlert color="danger" role="alert">
          Could not delete event
        </UncontrolledAlert>
      ) : null}
      {stateValue === 0 ? (
        <div>
          <div className="table-top">
            <Input
              placeholder="Search the table by title..."
              style={{ width: "25%", borderRadius: "30px", height: "40px" }}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
              onClick={() => {
                setStateValue(1);
              }}
            >
              <i className="mdi mdi-plus me-1" /> Add Event
            </Button>
          </div>
          <div style={{ width: "100%", overflow: "auto" }}>
            {eventsValue.length > 0 ? (
              <table style={{ fontSize: "5px" }}>
                <thead>
                  {columnsValue.map((header) => (
                    <th> {header.title} </th>
                  ))}
                </thead>
                <tbody>
                  {filteredData.map((data) => (
                    <Fragment>
                      <ReadOnly
                        data={data}
                        id={data.id}
                        deleteEventStatus={deleteEventStatus}
                        getEditId={getEditId}
                        getEditTitle={getEditTitle}
                        getEditAddress={getEditAddress}
                        getStartTime={getStartTime}
                        getEndTime={getEndTime}
                        getEditLocation={getEditLocation}
                        getEditDetails={getEditDetails}
                        getEditUrl={getEditUrl}
                        getPostalCode={getPostalCode}
                        editState={setEditState}
                        getEditImage={getEditImage}
                        token={token}
                      />
                    </Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No records to display</p>
            )}
          </div>
        </div>
      ) : null}
      {stateValue === 1 ? (
        <div className="input-add-events">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Title*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            title === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Title"
                          }
                          id="title"
                          onChange={(e) => setTitle(e.target.value)}
                          style={
                            title === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Upload Images*
                      </Label>
                      <Col md={10}>
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="customFile"
                            onChange={fileSelectHandler}
                            style={
                              file === null && createFieldsFilled === false
                                ? styles
                                : null
                            }
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Address*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            address === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Address"
                          }
                          id="title"
                          onChange={(e) => setAddress(e.target.value)}
                          style={
                            address === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">
                        Category*
                      </Label>
                      <Col md={10}>
                        <select
                          className="form-control"
                          onChange={(e) => setCategory(e.target.value)}
                          style={
                            (category === "" ||
                              category === "Select a Category") &&
                            createFieldsFilled === false
                              ? styles
                              : null
                          }
                        >
                          <option defaultValue>Select a Category</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-time-input"
                        className="col-md-2 col-form-label"
                      >
                        Start Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            startTime === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Start Time"
                          }
                          id="example-time-input"
                          onChange={(e) => setStartTime(e.target.value)}
                          style={
                            startTime === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-time-input"
                        className="col-md-2 col-form-label"
                      >
                        End Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            endTime === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter End Time"
                          }
                          id="example-time-input"
                          onChange={(e) => setEndTime(e.target.value)}
                          style={
                            endTime === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Postal Code*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            postalCode === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Postal Code"
                          }
                          id="example-search-input"
                          onChange={(e) => setPostalCode(e.target.value)}
                          style={
                            postalCode === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        URL*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            url === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter URL"
                          }
                          id="example-url-input"
                          onChange={(e) => setUrl(e.target.value)}
                          style={
                            url === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Event Details*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="textarea"
                          placeholder={
                            details === "" && createFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Event Details"
                          }
                          id="example-url-input"
                          onChange={(e) => setDetails(e.target.value)}
                          style={
                            details === "" && createFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>

                    {createFieldsFilled === false ? (
                      <p style={{ color: "red", textAlign: "center" }}>
                        One or more required fields are missing{" "}
                      </p>
                    ) : null}
                  </CardBody>
                  <div className="add-events-buttons">
                    <Button
                      color="light"
                      type="button"
                      className="waves-effect waves-light me-1"
                      outline
                      onClick={() => {
                        setStateValue(0);
                        setCreateFieldsFilled(null);
                      }}
                    >
                      <i className="ri-close-line align-middle me-2"></i> Cancel
                    </Button>

                    <Button
                      color="success"
                      type="button"
                      className="waves-effect waves-light me-1"
                      onClick={createEvent}
                    >
                      <i className="mdi mdi-plus me-1" />
                      Add Event
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
      {stateValue === 2 ? (
        <div className="input-add-events">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Title*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            title === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Title"
                          }
                          id="title"
                          value={titleE}
                          onChange={(e) => setTitleE(e.target.value)}
                          style={
                            titleE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Upload Images*
                      </Label>
                      <Col md={10}>
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="customFile"
                            onChange={fileSelectHandler}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Address*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            addressE === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Address"
                          }
                          id="title"
                          value={addressE}
                          onChange={(e) => setAddressE(e.target.value)}
                          style={
                            addressE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label className="col-md-2 col-form-label">
                        Category*
                      </Label>
                      <Col md={10}>
                        <select
                          className="form-control"
                          value={categoryE}
                          onChange={(e) => setCategoryE(e.target.value)}
                          style={
                            (categoryE === "" ||
                              categoryE === "Select a Category") &&
                            editFieldsFilled === false
                              ? styles
                              : null
                          }
                        >
                          <option defaultValue>Select a Category</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-time-input"
                        className="col-md-2 col-form-label"
                      >
                        Start Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            startTimeE === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Start Time"
                          }
                          id="example-time-input"
                          value={startTimeE}
                          onChange={(e) => setStartTimeE(e.target.value)}
                          style={
                            startTimeE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-time-input"
                        className="col-md-2 col-form-label"
                      >
                        End Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            endTimeE === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter End Time"
                          }
                          id="example-time-input"
                          value={endTimeE}
                          onChange={(e) => setEndTimeE(e.target.value)}
                          style={
                            endTimeE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-search-input"
                        className="col-md-2 col-form-label"
                      >
                        Postal Code*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            postalCodeE === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Postal Code"
                          }
                          id="example-search-input"
                          value={postalCodeE}
                          onChange={(e) => setPostalCodeE(e.target.value)}
                          style={
                            postalCodeE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        URL*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            urlE === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter URL"
                          }
                          id="example-url-input"
                          value={urlE}
                          onChange={(e) => setUrlE(e.target.value)}
                          style={
                            urlE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Label
                        htmlFor="example-url-input"
                        className="col-md-2 col-form-label"
                      >
                        Event Details*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="textarea"
                          placeholder={
                            detailsE === "" && editFieldsFilled === false
                              ? "This is a required field"
                              : "Enter Event Details"
                          }
                          id="example-url-input"
                          value={detailsE}
                          onChange={(e) => setDetailsE(e.target.value)}
                          style={
                            detailsE === "" && editFieldsFilled === false
                              ? styles
                              : null
                          }
                        />
                      </Col>
                    </Row>

                    {editFieldsFilled === false ? (
                      <p style={{ color: "red", textAlign: "center" }}>
                        One or more required fields are missing{" "}
                      </p>
                    ) : null}
                  </CardBody>
                  <div className="add-events-buttons">
                    <Button
                      color="light"
                      type="button"
                      className="waves-effect waves-light me-1"
                      outline
                      onClick={() => {
                        setStateValue(0);
                        setCreateFieldsFilled(null);
                      }}
                    >
                      <i className="ri-close-line align-middle me-2"></i> Cancel
                    </Button>

                    <Button
                      color="success"
                      type="button"
                      className="waves-effect waves-light me-1"
                      onClick={editEvent}
                    >
                      <i className="ri-check-fill align-middle ms-2"></i>
                      Confirm Changes
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;

import React, { useState, Fragment, useContext } from "react";
import Loading from "./loading.gif";

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

import { PlacesContext } from "../PlacesContext";

import Axios from "axios";

import "./DataTables.css";

const DataTable = ({ token }) => {
  const { addNew, columns, placesData, state } = useContext(PlacesContext);

  const columnsValue = columns;
  const [stateValue, setStateValue] = state;
  const [placesDataValue, setPlacesDataValue] = placesData;

  //PLACES DATA

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [longituide, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [twitter, setTwitter] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [s3File, setS3File] = useState("");

  // EDIT DATA
  const [id, setId] = useState("");
  const [titleE, setTitleE] = useState("");
  const [addressE, setAddressE] = useState("");
  const [longituideE, setLongitudeE] = useState("");
  const [latitudeE, setLatitudeE] = useState("");
  const [startTimeE, setStartTimeE] = useState("");
  const [endTimeE, setEndTimeE] = useState("");
  const [postalCodeE, setPostalCodeE] = useState("");
  const [categoryE, setCategoryE] = useState("");
  const [phoneE, setPhoneE] = useState("");
  const [fbE, setFbE] = useState("");
  const [instaE, setInstaE] = useState("");
  const [twitterE, setTwitterE] = useState("");
  const [urlE, setUrlE] = useState("");
  const [emailE, setEmailE] = useState("");

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
  const getEditPhone = (e) => {
    setPhoneE(e);
  };
  const getEditLong = (e) => {
    setLongitudeE(e);
  };
  const getEditLat = (e) => {
    setLatitudeE(e);
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
  const getEditFb = (e) => {
    setFbE(e);
  };
  const getEditInsta = (e) => {
    setInstaE(e);
  };
  const getEditTwitter = (e) => {
    setTwitterE(e);
  };
  const getEditEmail = (e) => {
    setEmailE(e);
  };

  //SEARCH AND
  const [searchParam, setSearchParam] = useState("");
  const [editContactId, setEditContactId] = useState(null);

  //FLAGS
  const [createFieldsFilled, setCreateFieldsFilled] = useState(null);
  const [editFieldsFilled, setEditFieldsFilled] = useState(null);

  const checkCreateFields = () => {
    if (
      title === "" ||
      address === "" ||
      longituide === "" ||
      latitude === "" ||
      startTime === "" ||
      endTime === "" ||
      postalCode === "" ||
      category === "" ||
      category === "Select a Category" ||
      phone === "" ||
      fb === "" ||
      insta === "" ||
      twitter === "" ||
      url === "" ||
      email === "" ||
      file === null
    ) {
      setCreateFieldsFilled(true);
    } else {
      setCreateFieldsFilled(false);
    }
  };
  const checkEditFields = () => {
    if (
      titleE === "" ||
      addressE === "" ||
      longituideE === "" ||
      latitudeE === "" ||
      startTimeE === "" ||
      endTimeE === "" ||
      postalCodeE === "" ||
      categoryE === "" ||
      categoryE === "Select a Category" ||
      phoneE === "" ||
      fbE === "" ||
      instaE === "" ||
      twitterE === "" ||
      urlE === "" ||
      emailE === "" ||
      file === null
    ) {
      setEditFieldsFilled(true);
    } else {
      setEditFieldsFilled(false);
    }
  };

  const styles = {
    borderColor: "red",
  };

  const filteredData = placesDataValue.filter((place) =>
    place.title.toLowerCase().includes(searchParam.toLowerCase())
  );

  const imgUrl = "http://18.216.174.90:3000/api/user/upload";

  const editPlaceBody = {
    pic: {
      pic: [
        {
          url: s3File,
        },
      ],
    },
    title: titleE,
    title_icon: "760634d2-f8ec-4caa-9a2d-14a8828cfb5dpetplace.jpg",
    social_link: {
      social_link: [
        {
          facebook: fbE,
        },
        {
          instagram: instaE,
        },
      ],
    },
    phone_number: phoneE,
    address: addressE,
    lat: latitudeE,
    long: longituideE,
    postcode: postalCodeE,
    start_time: startTimeE,
    end_time: endTimeE,
    email: emailE,
    web_url: urlE,
    createdAt: "2021-11-15T12:15:39.658Z",
    category: 1,
  };

  const bodyParameters = {
    pic: {
      pic: [
        {
          url: s3File,
        },
      ],
    },
    title: title,
    title_icon: "760634d2-f8ec-4caa-9a2d-14a8828cfb5dpetplace.jpg",
    social_link: {
      social_link: [
        {
          facebook: fb,
        },
        {
          instagram: insta,
        },
      ],
    },
    phone_number: phone,
    address: address,
    lat: latitude,
    long: longituide,
    postcode: postalCode,
    start_time: startTime,
    end_time: endTime,
    email: email,
    web_url: url,
    createdAt: "2021-11-15T12:15:39.658Z",
    category: 1,
  };

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

  const apiUrl = "http://3.15.82.201:3000/api/petplace";

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
  const editUrl = `http://3.15.82.201:3000/api/petplace/${id}`;

  const editPlace = (e) => {
    e.preventDefault();
    checkEditFields();
    Axios.put(editUrl, editPlaceBody, config)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => console.log("error: " + err));
  };

  const createPlace = (e) => {
    e.preventDefault();
    checkCreateFields();

    Axios.post(apiUrl, bodyParameters, config)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => console.log("error: " + err));
  };

  return (
    <div className="app-container">
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
              <i className="mdi mdi-plus me-1" /> Add Place
            </Button>
          </div>
          <div style={{ width: "100%", overflow: "auto" }}>
            {placesDataValue.length > 0 ? (
              <table style={{ fontSize: "5px" }}>
                <thead>
                  {columnsValue.map((header) => (
                    <th> {header.title} </th>
                  ))}
                </thead>
                <tbody>
                  {filteredData.map((data) => (
                    <ReadOnly
                      data={data}
                      id={data.id}
                      token={token}
                      setEditState={setEditState}
                      getEditId={getEditId}
                      getEditTitle={getEditTitle}
                      getEditAddress={getEditAddress}
                      getEditLong={getEditLong}
                      getEditLat={getEditLat}
                      getStartTime={getStartTime}
                      getEndTime={getEndTime}
                      getPostalCode={getPostalCode}
                      getEditUrl={getEditUrl}
                      getEditLocation={getEditLocation}
                      getEditFb={getEditFb}
                      getEditInsta={getEditInsta}
                      getEditTwitter={getEditTwitter}
                      getEditEmail={getEditEmail}
                      getEditPhone={getEditPhone}
                    />
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
                            title === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Title"
                          }
                          id="title"
                          onChange={(e) => setTitle(e.target.value)}
                          style={
                            title === "" && createFieldsFilled === true
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
                        Address*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            address === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Address"
                          }
                          id="title"
                          onChange={(e) => setAddress(e.target.value)}
                          style={
                            address === "" && createFieldsFilled === true
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
                        Longitude & Latitude*
                      </Label>
                      <Col md={5}>
                        <Input
                          type="text"
                          placeholder={
                            longituide === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Longitude"
                          }
                          id="example-search-input"
                          onChange={(e) => setLongitude(e.target.value)}
                          style={
                            longituide === "" && createFieldsFilled === true
                              ? styles
                              : null
                          }
                        />
                      </Col>
                      <Col md={5}>
                        <Input
                          type="text"
                          placeholder={
                            latitude === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Latitude"
                          }
                          id="example-search-input"
                          onChange={(e) => setLatitude(e.target.value)}
                          style={
                            latitude === "" && createFieldsFilled === true
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
                        Open Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            startTime === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Start Time"
                          }
                          id="example-time-input"
                          onChange={(e) => setStartTime(e.target.value)}
                          style={
                            startTime === "" && createFieldsFilled === true
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
                        Close Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            endTime === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter End Time"
                          }
                          id="example-time-input"
                          onChange={(e) =>
                            setEndTime(e.target.value.toString())
                          }
                          style={
                            endTime === "" && createFieldsFilled === true
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
                            postalCode === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Postal Code"
                          }
                          id="example-search-input"
                          onChange={(e) => setPostalCode(e.target.value)}
                          style={
                            postalCode === "" && createFieldsFilled === true
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
                          <option value="Resturant">Resturant</option>
                          <option value="Cafe">Cafe</option>
                          <option value="Pub">Pub</option>
                          <option value="Park">Park</option>
                          <option value="Hotel">Hotel</option>
                        </select>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Label
                        htmlFor="example-tel-input"
                        className="col-md-2 col-form-label"
                      >
                        Phone*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="tel"
                          placeholder={
                            phone === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Phone"
                          }
                          id="example-tel-input"
                          onChange={(e) => setPhone(e.target.value)}
                          style={
                            phone === "" && createFieldsFilled === true
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
                        Facebook Link*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            fb === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Facebook Link"
                          }
                          id="example-url-input"
                          onChange={(e) => setFb(e.target.value)}
                          style={
                            phone === "" && createFieldsFilled === true
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
                        Instagram Link*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            insta === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Instagram Link"
                          }
                          id="example-url-input"
                          onChange={(e) => setInsta(e.target.value)}
                          style={
                            insta === "" && createFieldsFilled === true
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
                        Twitter Link*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            twitter === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Twitter Link"
                          }
                          id="example-url-input"
                          onChange={(e) => setTwitter(e.target.value)}
                          style={
                            twitter === "" && createFieldsFilled === true
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
                        Email*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            email === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Email"
                          }
                          id="example-url-input"
                          onChange={(e) => setEmail(e.target.value)}
                          style={
                            email === "" && createFieldsFilled === true
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
                        URL Web*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            url === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter URL"
                          }
                          id="example-url-input"
                          onChange={(e) => setUrl(e.target.value)}
                          style={
                            url === "" && createFieldsFilled === true
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
                              file === null && createFieldsFilled === true
                                ? styles
                                : null
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    {createFieldsFilled ? (
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
                        setCreateFieldsFilled(null);
                        setStateValue(0);
                      }}
                    >
                      <i className="ri-close-line align-middle me-2"></i> Cancel
                    </Button>

                    <Button
                      color="success"
                      type="button"
                      className="waves-effect waves-light me-1"
                      onClick={createPlace}
                    >
                      <i className="ri-add-circle-fill align-middle ms-2"></i>
                      Add Place
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
                            title === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Title"
                          }
                          id="title"
                          value={titleE}
                          onChange={(e) => setTitleE(e.target.value)}
                          style={
                            title === "" && createFieldsFilled === true
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
                        Address*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            address === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Address"
                          }
                          id="title"
                          value={addressE}
                          onChange={(e) => setAddressE(e.target.value)}
                          style={
                            address === "" && createFieldsFilled === true
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
                        Longitude & Latitude*
                      </Label>
                      <Col md={5}>
                        <Input
                          type="text"
                          placeholder={
                            longituide === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Longitude"
                          }
                          id="example-search-input"
                          value={longituideE}
                          onChange={(e) => setLongitudeE(e.target.value)}
                          style={
                            longituide === "" && createFieldsFilled === true
                              ? styles
                              : null
                          }
                        />
                      </Col>
                      <Col md={5}>
                        <Input
                          type="text"
                          placeholder={
                            latitude === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Latitude"
                          }
                          id="example-search-input"
                          value={latitudeE}
                          onChange={(e) => setLatitudeE(e.target.value)}
                          style={
                            latitude === "" && createFieldsFilled === true
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
                        Open Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            startTime === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Start Time"
                          }
                          id="example-time-input"
                          value={startTimeE}
                          onChange={(e) => setStartTimeE(e.target.value)}
                          style={
                            startTime === "" && createFieldsFilled === true
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
                        Close Time*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="datetime-local"
                          placeholder={
                            endTime === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter End Time"
                          }
                          id="example-time-input"
                          value={endTimeE}
                          onChange={(e) =>
                            setEndTimeE(e.target.value.toString())
                          }
                          style={
                            endTime === "" && createFieldsFilled === true
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
                            postalCode === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Postal Code"
                          }
                          id="example-search-input"
                          value={postalCodeE}
                          onChange={(e) => setPostalCodeE(e.target.value)}
                          style={
                            postalCode === "" && createFieldsFilled === true
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
                            (category === "" ||
                              category === "Select a Category") &&
                            createFieldsFilled === false
                              ? styles
                              : null
                          }
                        >
                          <option defaultValue>Select a Category</option>
                          <option value="Resturant">Resturant</option>
                          <option value="Cafe">Cafe</option>
                          <option value="Pub">Pub</option>
                          <option value="Park">Park</option>
                          <option value="Hotel">Hotel</option>
                        </select>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Label
                        htmlFor="example-tel-input"
                        className="col-md-2 col-form-label"
                      >
                        Phone*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="tel"
                          placeholder={
                            phone === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Phone"
                          }
                          id="example-tel-input"
                          value={phoneE}
                          onChange={(e) => setPhoneE(e.target.value)}
                          style={
                            phone === "" && createFieldsFilled === true
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
                        Facebook Link*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            fb === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Facebook Link"
                          }
                          id="example-url-input"
                          value={fbE}
                          onChange={(e) => setFbE(e.target.value)}
                          style={
                            phone === "" && createFieldsFilled === true
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
                        Instagram Link*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            insta === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Instagram Link"
                          }
                          id="example-url-input"
                          value={instaE}
                          onChange={(e) => setInstaE(e.target.value)}
                          style={
                            insta === "" && createFieldsFilled === true
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
                        Twitter Link*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            twitter === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Twitter Link"
                          }
                          id="example-url-input"
                          value={twitterE}
                          onChange={(e) => setTwitterE(e.target.value)}
                          style={
                            twitter === "" && createFieldsFilled === true
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
                        Email*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            email === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter Email"
                          }
                          id="example-url-input"
                          value={emailE}
                          onChange={(e) => setEmailE(e.target.value)}
                          style={
                            email === "" && createFieldsFilled === true
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
                        URL Web*
                      </Label>
                      <Col md={10}>
                        <Input
                          type="text"
                          placeholder={
                            url === "" && createFieldsFilled === true
                              ? "This is a required field"
                              : "Enter URL"
                          }
                          id="example-url-input"
                          value={urlE}
                          onChange={(e) => setUrlE(e.target.value)}
                          style={
                            url === "" && createFieldsFilled === true
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
                              file === null && createFieldsFilled === true
                                ? styles
                                : null
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                    {createFieldsFilled ? (
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
                        setEditFieldsFilled(null);
                        setStateValue(0);
                      }}
                    >
                      <i className="ri-close-line align-middle me-2"></i> Cancel
                    </Button>

                    <Button
                      color="success"
                      type="button"
                      className="waves-effect waves-light me-1"
                      onClick={editPlace}
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

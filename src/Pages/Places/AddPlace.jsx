import React, { useState, useContext } from "react";
import "./AddPlace.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../AuthContext";

const AddPlace = () => {
  const { token, api } = useContext(AuthContext);
  const [jwtToken, setJwtToken] = token;
  const [apiUrl, setApiUrl] = api;
  setJwtToken(localStorage.getItem("jwtToken"));

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
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [s3File, setS3File] = useState("");
  const [createFieldsFilled, setCreateFieldsFilled] = useState(null);

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
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const imgUrl = `http://3.15.82.201:3000/api/v1/user/upload`;
  const createApi = `${apiUrl}/petplace`;

  const Input = styled("input")({
    display: "none",
  });

  const fileSelectHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    const image = new FormData();
    if (file !== null) {
      image.append("file", file, file.name);
      console.log(image);
      Axios.post(imgUrl, image, imgConfig)
        .then((response) => {
          setS3File(response.data.key);
          console.log(s3File);
        })
        .catch((err) => console.log("error: " + err));
    }
  };

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
      url === "" ||
      email === "" ||
      file === null
    ) {
      setCreateFieldsFilled(true);
    } else {
      setCreateFieldsFilled(false);
    }
  };
  const createPlace = (e) => {
    console.log("Pressed");
    e.preventDefault();
    checkCreateFields();

    Axios.post(createApi, bodyParameters, config)
      .then((response) => {
        window.location.href = "/places";
      })
      .catch((err) => console.log("error: " + err));
  };

  const buttonStyle = {
    backgroundColor: "#1ca395",
    marginLeft: "10px",
  };

  return (
    <div className="addplace-container">
      <h1 style={{ color: "#343a40" }}> Add a Pet Friendly Place </h1>
      <div style={{ display: "flex" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "60ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Longitude"
            variant="outlined"
            onChange={(e) => setLongitude(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Latitude"
            variant="outlined"
            onChange={(e) => setLatitude(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Insta Link"
            variant="outlined"
            onChange={(e) => setInsta(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="datetime-local"
              className="datepicker"
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="datetime-local"
              className="datepicker"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={fileSelectHandler}
            />
            <Button variant="contained" component="span">
              Upload an image
            </Button>
          </label>
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "60ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Postal Code"
            variant="outlined"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Age"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="Cafe">Cafe</MenuItem>
              <MenuItem value="Pub">Pub</MenuItem>
              <MenuItem value="Park">Park</MenuItem>
              <MenuItem value="Hotel">Hotel</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">https://</InputAdornment>
              ),
            }}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Facebook Link"
            variant="outlined"
            onChange={(e) => setFb(e.target.value)}
          />
        </Box>
      </div>
      <div style={{ display: "flex", marginTop: "20px", marginLeft: "10px" }}>
        <Link to="/places" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="error">
            Cancel
          </Button>
        </Link>

        <Button style={buttonStyle} variant="contained" onClick={createPlace}>
          Add Place
        </Button>
      </div>
    </div>
  );
};

export default AddPlace;

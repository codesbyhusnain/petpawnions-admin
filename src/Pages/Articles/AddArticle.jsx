import React, { useState, useContext } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import RichTextEditor from "../../Components/RichText/RichText";
import "draft-js/dist/Draft.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../../AuthContext";

const AddArticle = () => {
  const { token, api } = useContext(AuthContext);
  const [jwtToken, setJwtToken] = token;
  const [apiUrl, setApiUrl] = api;
  setJwtToken(localStorage.getItem("jwtToken"));

  const [error, setError] = useState("");

  const [table, setTable] = useState(true);
  const [id, setId] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [featured, setFeatured] = useState("");
  const [details, setDetails] = useState("");
  const [plainText, setPlainText] = useState("");
  const [formattedData, setFormattedData] = useState(null);
  const [file, setFile] = useState(null);
  const [s3File, setS3File] = useState("");

  const bodyParameters = {
    isFeatured: true,
    header: "Cats?",
    pic: "74dfb65f-056b-4665-865e-6a2cca92849cpetArticle.png",
    detail:
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions for realz',
    tag: ["Tranding", "Most Recent", "Most Favorite", "Most Liked"],
    createdAt: "2021-11-16T13:56:51.163Z",
    author: 1,
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

  const createPlace = (e) => {
    console.log("Pressed");
    e.preventDefault();
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
    <div className="editarticle-container" style={{ marginLeft: "250px" }}>
      <h1 style={{ color: "#343a40" }}> Create a new article </h1>
      <div style={{ display: "flex" }}>
        {" "}
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Featured
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Age"
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
              >
                <MenuItem value="Featured">Featured</MenuItem>
                <MenuItem value="Not Featured">Not Featured</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Article Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Age"
              >
                <MenuItem value="Restaurant">Article</MenuItem>
                <MenuItem value="Cafe">Blog</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              value={author}
              variant="outlined"
              disabled
            />
          </Box>
        </div>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px", width: "90%" }}>
        <RichTextEditor />
      </div>

      <Stack spacing={2} direction="row">
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
      </Stack>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          width: "90%",
          justifyContent: "flex-end",
        }}
      >
        <Link to="/articles" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setTable(true)}
          >
            Cancel
          </Button>
        </Link>
        <Button style={buttonStyle} variant="contained">
          Confirm Changes
        </Button>
      </div>
    </div>
  );
};

export default AddArticle;

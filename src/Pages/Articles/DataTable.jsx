import React, { useState, useEffect, Fragment } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import RichTextEditor from "../../Components/RichText/RichText";
import "draft-js/dist/Draft.css";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { id: "title", label: "Title", minWidth: 100 },
  { id: "author", label: "Author", minWidth: 100 },
  { id: "long", label: "Likes", minWidth: 100 },
  { id: "lat", label: "Views", minWidth: 100 },
  { id: "open", label: "Comments", minWidth: 100 },
  { id: "close", label: "Featured", minWidth: 100 },
  { id: "close", label: "Actions", minWidth: 100 },
];

export default function StickyHeadTable({ token, apiUrl }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [petArticles, setArticles] = useState([]);
  const [search, setSearch] = useState("");

  const imgConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const imgUrl = `http://3.15.82.201:3000/api/v1/user/upload`;
  const editApi = `${apiUrl}/petplace`;

  const Input = styled("input")({
    display: "none",
  });

  const buttonStyle = {
    backgroundColor: "#1ca395",
    marginLeft: "10px",
  };
  const searchStyle = {
    width: "350px",
  };

  // EDIT DATA

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
  const articleApi = `${apiUrl}/article`;

  const editPlace = (e) => {
    e.preventDefault();
    Axios.put(`${articleApi}/${id}`, bodyParameters, config)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => console.log("error: " + err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    Axios.get(articleApi, config).then((response) => {
      setArticles(response.data.data);
    });
  }, []);

  const filteredArticles = petArticles.filter((place) =>
    place.header.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Fragment>
      {table ? (
        <Fragment>
          <h1 style={{ color: "#343a40" }}> Articles </h1>
          <div className="places-actions">
            <TextField
              label="Search the articles..."
              sx={searchStyle}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/articles/add-article" style={{ textDecoration: "none" }}>
              <Button
                sx={buttonStyle}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Article
              </Button>
            </Link>
          </div>
          <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredArticles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((article, idx) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={article.id}
                        >
                          <TableCell>{article.header}</TableCell>
                          <TableCell>
                            {article.author.firstName +
                              " " +
                              article.author.lastName}
                          </TableCell>
                          <TableCell>{article.likes_count}</TableCell>
                          <TableCell>{article.views_count}</TableCell>
                          <TableCell>{article.comment.length}</TableCell>
                          <TableCell>
                            {article.isFeatured ? "Featured" : "Not Featured"}
                          </TableCell>
                          <TableCell>
                            <div>
                              <IconButton
                                aria-label="delete"
                                fontSize="small"
                                color="error"
                                onClick={(e) => {
                                  e.preventDefault();
                                  Axios.delete(
                                    `http://3.15.82.201:3000/api/v1/article/${article.id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  )
                                    .then((res) => {
                                      console.log(res);
                                      window.location.reload(true);
                                    })
                                    .catch((err) =>
                                      setError(
                                        "Error in deleting article! Please try again"
                                      )
                                    );
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>

                              <IconButton
                                aria-label="delete"
                                fontSize="small"
                                color="primary"
                                onClick={() => {
                                  setId(article.id);
                                  setTitle(article.header);
                                  setFeatured(article.isFeatured);
                                  setAuthor(
                                    article.author.firstName +
                                      " " +
                                      article.author.lastName
                                  );

                                  setTable(false);
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[50, 100, 150]}
              component="div"
              count={filteredArticles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Fragment>
      ) : (
        <div className="editplace-container">
          <h1 style={{ color: "#343a40" }}> Edit the article </h1>
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
          <div
            style={{ marginTop: "20px", marginBottom: "20px", width: "90%" }}
          >
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
            <Button
              variant="contained"
              color="error"
              onClick={() => setTable(true)}
            >
              Cancel
            </Button>
            <Button style={buttonStyle} variant="contained">
              Confirm Changes
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

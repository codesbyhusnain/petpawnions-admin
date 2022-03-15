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

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { id: "title", label: "Title", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 100 },
  { id: "open", label: "Start Time", minWidth: 100 },
  { id: "close", label: "End Time", minWidth: 100 },
  { id: "postal", label: "Postal Code", minWidth: 100 },
  { id: "category", label: "Event Type", minWidth: 100 },
  { id: "url", label: "URL", minWidth: 100 },
  { id: "action", label: "Actions", minWidth: 100 },
];

export default function StickyHeadTable({ token, apiUrl }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [petEvents, setPetEvents] = useState([]);
  const [search, setSearch] = useState("");

  const imgConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const imgUrl = `http://3.15.82.201:3000/api/v1/user/upload`;
  const editApi = `${apiUrl}/event`;

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
  const buttonStyle = {
    backgroundColor: "#1ca395",
    marginLeft: "10px",
  };
  const searchStyle = {
    width: "350px",
  };

  // EDIT DATA
  const [table, setTable] = useState(true);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [s3File, setS3File] = useState("");

  const eventsApi = `${apiUrl}/event`;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const bodyParameters = {
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

  const editEvent = (e) => {
    e.preventDefault();
    Axios.put(`${eventsApi}/${id}`, bodyParameters, config)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((err) => console.log("error: " + err));
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
    Axios.get(eventsApi, config).then((response) =>
      setPetEvents(response.data.data)
    );
  }, []);

  const filteredPlaces = petEvents.filter((place) =>
    place.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Fragment>
      {table ? (
        <Fragment>
          <h1 style={{ color: "#343a40" }}> Pet Events </h1>
          <div className="places-actions">
            <TextField
              label="Search the events..."
              sx={searchStyle}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/events/add-event" style={{ textDecoration: "none" }}>
              <Button
                sx={buttonStyle}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Event
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
                  {filteredPlaces
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event, idx) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={event.id}
                        >
                          <TableCell>{event.title}</TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>
                            {event.start_time.substr(11, 5)}
                          </TableCell>
                          <TableCell>{event.end_time.substr(11, 5)}</TableCell>
                          <TableCell>{event.postal_code}</TableCell>
                          <TableCell>{event.event_type}</TableCell>
                          <TableCell>{event.url}</TableCell>
                          <TableCell>
                            <div>
                              <IconButton
                                aria-label="delete"
                                fontSize="small"
                                color="error"
                                onClick={(e) => {
                                  e.preventDefault();
                                  Axios.delete(`${eventsApi}/${event.id}`, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  })
                                    .then((res) => {
                                      console.log(res);
                                      window.location.reload(true);
                                    })
                                    .catch((err) => console.log(err));
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>

                              <IconButton
                                aria-label="delete"
                                fontSize="small"
                                color="primary"
                                onClick={() => {
                                  setId(event.id);
                                  setTitle(event.title);
                                  setAddress(event.location);
                                  setStartTime(event.start_time);
                                  setEndTime(event.end_time);
                                  setPostalCode(event.postal_code);
                                  setCategory(event.event_type);
                                  setUrl(event.url);
                                  setTable(false);
                                  setDetails(event.detail);
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
              count={petEvents.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Fragment>
      ) : (
        <div className="editplace-container">
          <h1 style={{ color: "#343a40" }}> Edit the place </h1>
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
                value={title}
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Address"
                value={address}
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
              />

              <TextField
                id="outlined-multiline-flexible"
                label="Details"
                multiline
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxRows={5}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="datetime-local"
                  className="datepicker"
                  defaultValue={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                  type="datetime-local"
                  defaultValue={endTime}
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
                value={postalCode}
                variant="outlined"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Event Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Restaurant">Offline</MenuItem>
                  <MenuItem value="Cafe">Online</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                value={url}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      https://www.
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Box>
          </div>
          <div
            style={{ display: "flex", marginTop: "20px", marginLeft: "10px" }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => setTable(true)}
            >
              Cancel
            </Button>
            <Button style={buttonStyle} variant="contained" onClick={editEvent}>
              Confirm Changes
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

import React, { useState, useContext } from "react";

import Axios from "axios";

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  Button,
  Container,
  Input,
} from "reactstrap";

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import ReadOnly from "./ReadOnly";

import { ArticlesContext } from "../ArticlesContext";

import "./DataTables.css";

const DataTable = ({ token }) => {
  const { articles, state, columns } = useContext(ArticlesContext);
  const [articlesValue, setArticlesValue] = articles;
  const [stateValue, setStateValue] = state;

  const columnsValue = columns;

  //USR DATA

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState("");
  const [file, setFile] = useState(null);

  const [s3File, setS3File] = useState("");
  const [details, setDetails] = useState(EditorState.createEmpty());
  const [plainText, setPlainText] = useState("");
  const [formattedData, setFormattedData] = useState(null);

  const [id, setId] = useState("");
  const [titleE, setTitleE] = useState("");
  const [categoryE, setCategoryE] = useState("");
  const [featuredE, setFeaturedE] = useState("");
  const [author, setAuthor] = useState("");
  const [detailsE, setDetailsE] = useState(EditorState.createEmpty());
  const [plainTextE, setPlainTextE] = useState("");

  const getEditCategory = (e) => {
    setCategoryE(e);
  };
  const getEditId = (e) => {
    setId(e);
  };
  const getEditTitle = (e) => {
    setTitleE(e);
  };
  const getEditFeatured = (e) => {
    setFeaturedE(e);
  };
  const getAuthor = (e) => {
    setAuthor(e);
  };
  const setEditState = (e) => {
    setStateValue(2);
  };
  const setEditDetails = (e) => {
    setDetailsE(EditorState.createWithContent(ContentState.createFromText(e)));
  };

  const [searchParam, setSearchParam] = useState("");
  const [fieldsFilled, setFieldsFilled] = useState(false);

  const bodyParameters = {
    isFeatured: featured === "Featured" ? true : false,
    header: title,
    pic: s3File,
    detail: plainText,
    tag: ["Trending", "Most Recent", "Most Favorite", "Most Liked"],
    createdAt: "2021-11-16T13:56:51.163Z",
    author: 161,
    category: 1,
  };
  const editParameters = {
    isFeatured: featuredE === "Featured" ? true : false,
    header: titleE,
    pic: s3File,
    detail: plainTextE,
    tag: ["Trending", "Most Recent", "Most Favorite", "Most Liked"],
    createdAt: "2021-11-16T13:56:51.163Z",
    author: 161,
    category: 1,
  };
  const checkFields = () => {
    if (
      title !== "" ||
      category !== "" ||
      category !== "Select a Category" ||
      details !== "" ||
      file !== undefined
    ) {
      setFieldsFilled(true);
    }
  };

  const editorStateChange = (details) => {
    setDetails(details);
    setPlainText(details.getCurrentContent().getPlainText());
    setFormattedData(convertToRaw(details.getCurrentContent()));
  };

  const editorEditStateChange = (detailsE) => {
    setDetailsE(detailsE);
    setPlainTextE(detailsE.getCurrentContent().getPlainText());
    setFormattedData(convertToRaw(detailsE.getCurrentContent()));
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
  const apiUrl = "http://3.15.82.201:3000/api/article";
  const editUrl = `http://3.15.82.201:3000/api/article/${id}`;
  const imgUrl = "http://3.15.82.201:3000/api/user/upload";

  const fileSelectHandler = (e) => {
    setFile(e.target.files[0]);
    if (file !== null) {
      const image = new FormData();
      image.append("file", file, file.name);
      Axios.post(imgUrl, image, imgConfig)
        .then((response) => {
          console.log(response);
          setS3File(response.data.key);
        })
        .catch((err) => console.log("error: " + err));
    }
  };

  const editArticle = (e) => {
    e.preventDefault();

    Axios.put(editUrl, editParameters, config)
      .then((response) => {
        console.log(response);
        window.location.reload(true);
      })
      .catch((err) => console.log("error: " + err));
  };

  const createArticle = (e) => {
    e.preventDefault();
    if (file !== null) {
      const image = new FormData();
      image.append("file", file, file.name);
      Axios.post(imgUrl, image, imgConfig)
        .then((response) => {
          console.log(response);
          setS3File(response.data.key);
        })
        .catch((err) => console.log("error: " + err));
    }
    if (fieldsFilled) {
      Axios.post(apiUrl, bodyParameters, config)
        .then((response) => {
          console.log(response);
          window.location.reload(true);
        })
        .catch((err) => console.log("error: " + err));
    }
  };

  const filteredData = articlesValue.filter((article) =>
    article.header.toLowerCase().includes(searchParam.toLowerCase())
  );

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
              <i className="mdi mdi-plus me-1" /> Add Article
            </Button>
          </div>
          <div style={{ width: "100%", overflow: "auto" }}>
            {articlesValue.length > 0 ? (
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
                      getEditCategory={getEditCategory}
                      getEditId={getEditId}
                      getEditTitle={getEditTitle}
                      getEditFeatured={getEditFeatured}
                      setEditState={setEditState}
                      setEditDetails={setEditDetails}
                      getAuthor={getAuthor}
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
        <div className="input-add-articles">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Input
                          type="text"
                          placeholder="Add Title"
                          id="example-search-input"
                          onClick={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <select
                          className="form-control"
                          onClick={(e) => setCategory(e.target.value)}
                        >
                          <option defaultValue>Select a Category</option>
                          <option value="Article">Article</option>
                          <option value="Blog">Blog</option>
                        </select>
                      </Col>
                      <Col md={6}>
                        <Input
                          type="text"
                          placeholder="Add Author"
                          id="example-search-input"
                          disabled
                        />
                      </Col>
                    </Row>

                    <Form method="post">
                      <Editor
                        editorState={details}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={editorStateChange}
                      />
                    </Form>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "67%" }}>
                        <Row className="mb-3">
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
                        </Row>{" "}
                      </div>
                      <div style={{ marginTop: "15px" }}>
                        <select
                          className="form-control"
                          onChange={(e) => setFeatured(e.target.value)}
                        >
                          <option defaultValue>Type</option>
                          <option value="Featured">Featured</option>
                          <option value="Not Featured">Not Featured</option>
                        </select>
                      </div>
                    </div>
                  </CardBody>
                  <div className="add-events-buttons">
                    <Button
                      color="light"
                      type="button"
                      className="waves-effect waves-light me-1"
                      outline
                      onClick={() => setStateValue(0)}
                    >
                      <i className="ri-close-line align-middle me-2"></i>
                      Cancel
                    </Button>

                    <Button
                      color="success"
                      type="button"
                      className="waves-effect waves-light me-1"
                      onClick={createArticle}
                    >
                      <i className="ri-add-circle-fill align-middle ms-2"></i>
                      Add Article
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) : null}
      {stateValue === 2 ? (
        <div className="input-add-articles">
          <Container fluid>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Input
                          type="text"
                          placeholder="Add Title"
                          id="example-search-input"
                          value={titleE}
                          onChange={(e) => setTitleE(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <select
                          className="form-control"
                          value={categoryE}
                          onChange={(e) => setCategoryE(e.target.value)}
                        >
                          <option defaultValue>Select a Category</option>
                          <option value="Article">Article</option>
                          <option value="Blog">Blog</option>
                        </select>
                      </Col>
                      <Col md={6}>
                        <Input
                          type="text"
                          value={author}
                          placeholder="Add Author"
                          id="example-search-input"
                          disabled
                        />
                      </Col>
                    </Row>

                    <Form method="post">
                      <Editor
                        editorState={detailsE}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={editorEditStateChange}
                      />
                    </Form>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "67%" }}>
                        <Row className="mb-3">
                          <Col md={10}>
                            <div className="input-group">
                              <input type="file" onChange={fileSelectHandler} />
                            </div>
                          </Col>
                        </Row>{" "}
                      </div>

                      <div style={{ marginTop: "15px" }}>
                        <select
                          className="form-control"
                          value={featuredE}
                          onChange={(e) => setFeaturedE(e.target.value)}
                        >
                          <option defaultValue>Type</option>
                          <option value="Featured">Featured</option>
                          <option value="Not Featured">Not Featured</option>
                        </select>
                      </div>
                    </div>
                  </CardBody>
                  <div className="add-events-buttons">
                    <Button
                      color="light"
                      type="button"
                      className="waves-effect waves-light me-1"
                      outline
                      onClick={() => setStateValue(0)}
                    >
                      <i className="ri-close-line align-middle me-2"></i>
                      Cancel
                    </Button>

                    <Button
                      color="success"
                      type="button"
                      className="waves-effect waves-light me-1"
                      onClick={editArticle}
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

import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const ReadOnly = ({
  data,
  token,
  getEditCategory,
  getEditId,
  getEditTitle,
  getEditFeatured,
  getAuthor,
  setEditState,
  setEditDetails,
  id,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const apiUrl = `http://18.216.174.90:3000/api/article/${id}`;
  const deleteArticle = (e) => {
    e.preventDefault();
    Axios.delete(apiUrl, config)
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <tr>
      <td>{data.header}</td>
      <td>{data.author.firstName + " " + data.author.lastName}</td>
      <td>{data.likes_count}</td>
      <td>{data.views_count}</td>
      <td>{data.comment.length}</td>
      <td>{data.isFeatured ? "Featured" : "Not Featured"}</td>

      <td>
        <Link
          to="#"
          className="me-3 text-primary"
          onClick={() => {
            setEditState();
            getEditId(data.id);
            getEditTitle(data.header);
            getEditFeatured(data.isFeatured ? "Featured" : "Not Featured");
            getEditCategory(data.category === 1 ? "Article" : "Blog");
            setEditDetails(data.detail);
            getAuthor(data.author.firstName + " " + data.author.lastName);
          }}
        >
          <i class="ri-pencil-line"></i>
        </Link>
        <Link to="#" className="text-danger" onClick={deleteArticle}>
          <i class="ri-delete-bin-line"></i>
        </Link>
      </td>
    </tr>
  );
};

export default ReadOnly;

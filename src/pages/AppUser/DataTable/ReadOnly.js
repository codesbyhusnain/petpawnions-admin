import React from "react";
import { Link } from "react-router-dom";

const ReadOnly = ({ data, handleEditClick }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.position}</td>
      <td>{data.office}</td>
      <td>
        <Link
          to="#"
          className="me-3 text-primary"
          onClick={(event) => handleEditClick(event, data)}
        >
          <i className="mdi mdi-pencil font-size-18"></i>
        </Link>
        <Link to="#" className="text-danger">
          <i className="mdi mdi-trash-can font-size-18"></i>
        </Link>
      </td>
    </tr>
  );
};

export default ReadOnly;

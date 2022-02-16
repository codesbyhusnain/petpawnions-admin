import React from "react";
import { Link } from "react-router-dom";

import Axios from "axios";

const ReadOnly = ({
  data,
  id,
  deleteEventStatus,
  editState,
  token,
  getEditId,
  getEditTitle,
  getEditAddress,
  getStartTime,
  getEndTime,
  getEditLocation,
  getEditDetails,
  getEditUrl,
  getPostalCode,
  getEditImage,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const apiUrl = `http://3.15.82.201:3000/api/event/${id}`;
  const deleteEvent = (e) => {
    e.preventDefault();
    Axios.delete(apiUrl, config)
      .then((res) => {
        console.log(res);
        deleteEventStatus(true);
        window.location.reload(true);
      })
      .catch((err) => deleteEventStatus(false));
  };

  return (
    <tr>
      <td>{data.title}</td>
      <td>{data.location}</td>
      <td>
        {data.event_type.charAt(0).toUpperCase() + data.event_type.slice(1)}
      </td>
      <td>{data.start_time.replace("T", " ")}</td>
      <td>{data.end_time}</td>
      <td>{data.postal_code}</td>
      <td>
        <a href={data.url}>{data.url}</a>
      </td>

      <td>
        <Link
          to="#"
          className="me-3 text-primary"
          onClick={() => {
            getEditId(data.id);
            getEditTitle(data.title);
            getEditAddress(data.location);
            getStartTime(data.start_time);
            getEndTime(data.end_time);
            getEditLocation(data.event_type);
            getEditDetails(data.detail);
            getEditUrl(data.url);
            getPostalCode(data.postal_code);
            getEditImage(data.pic);
            editState();
          }}
        >
          <i class="ri-pencil-line"></i>
        </Link>
        <Link to="#" className="text-danger" onClick={deleteEvent}>
          <i class="ri-delete-bin-line"></i>
        </Link>
      </td>
    </tr>
  );
};

export default ReadOnly;

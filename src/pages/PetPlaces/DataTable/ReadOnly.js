import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const ReadOnly = ({
  data,

  token,
  id,
  setEditState,
  getEditId,
  getEditTitle,
  getEditAddress,
  getEditLong,
  getEditLat,
  getEditPhone,
  getStartTime,
  getEndTime,
  getPostalCode,
  getEditUrl,
  getEditLocation,
  getEditFb,
  getEditInsta,
  getEditTwitter,
  getEditEmail,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const apiUrl = `http://18.216.174.90:3000/api/petplace/${id}`;
  const deleteEvent = (e) => {
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
      <td>{data.title}</td>
      <td>{data.address}</td>
      <td>{data.long}</td>
      <td>{data.lat}</td>
      <td>{data.start_time}</td>
      <td>{data.end_time}</td>
      <td>{data.postcode}</td>
      <td>{data.category.name}</td>
      <td>{data.phone_number}</td>
      {/* <td>faceboook</td> */}
      {/* <td>{data.insta}</td> */}
      {/* <td>{data.twitter}</td> */}
      <td>{data.email}</td>
      <td>{data.web_url}</td>

      <td>
        <Link
          to="#"
          className="me-3 text-primary"
          onClick={() => {
            getEditId(data.id);
            getEditTitle(data.title);
            getEditAddress(data.address);
            getStartTime(data.start_time);
            getEndTime(data.end_time);
            getEditLocation(data.event_type);
            getEditUrl(data.web_url);
            getPostalCode(data.postcode);
            getEditLong(data.long);
            getEditLat(data.lat);
            getEditFb(data.social_link.social_link[0].facebook);
            getEditInsta(data.social_link.social_link[1].instagram);
            // getEditTwitter(data.social_link.social_link[2].twitter);
            getEditEmail(data.email);
            getEditPhone(data.phone_number);
            setEditState();
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

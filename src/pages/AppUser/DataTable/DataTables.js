import React, { useState, Fragment, useContext } from "react";
import { Input } from "reactstrap";

import ReadOnly from "./ReadOnly";

import { AppUserContext } from "../AppUserContext";

const DataTable = () => {
  const appUser = useContext(AppUserContext);

  const [searchParam, setSearchParam] = useState("");
  const filteredData = appUser.filter((place) =>
    place.name.toLowerCase().includes(searchParam.toLowerCase())
  );

  //USR DATA
  const columns = [
    {
      title: "ID",
    },
    {
      title: "Name",
    },
    {
      title: "Email",
    },
    {
      title: "Phone",
    },

    {
      title: "Action",
    },
  ];

  return (
    <div className="app-container">
      <div>
        <div className="table-top">
          <Input
            placeholder="Search the table by name..."
            style={{ width: "25%", borderRadius: "30px", height: "40px" }}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <div
            className="btn-group"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              defaultChecked
            />
            <label className="btn btn-outline-secondary" htmlFor="btnradio1">
              Consumer
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
            />
            <label className="btn btn-outline-secondary" htmlFor="btnradio2">
              Supplier
            </label>
          </div>
        </div>
        <div style={{ width: "100%", overflow: "auto" }}>
          <table style={{ fontSize: "5px" }}>
            <thead>
              {columns.map((header) => (
                <th> {header.title} </th>
              ))}
            </thead>
            <tbody>
              {filteredData.map((product) => (
                <Fragment>
                  <ReadOnly data={product} />
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

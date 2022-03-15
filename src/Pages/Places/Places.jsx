import React, { useContext, useState } from "react";
import DataTable from "./DataTable";
import "./Places.css";

import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthContext";
import { AuthProvider } from "../../AuthContext";

const Places = () => {
  const { token, api } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  const [apiUrl, setApiUrl] = api;
  const [search, setSearch] = useState("");

  setJwtToken(localStorage.getItem("jwtToken"));

  return (
    <AuthProvider>
      <div className="places-container">
        <DataTable token={jwtToken} apiUrl={apiUrl} search={search} />
      </div>
    </AuthProvider>
  );
};

export default Places;

import React, { useContext, useState } from "react";
import DataTable from "./DataTable";
import "./Articles.css";

import { AuthContext } from "../../AuthContext";
import { AuthProvider } from "../../AuthContext";

const Articles = () => {
  const { token, api } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  const [apiUrl, setApiUrl] = api;
  const [search, setSearch] = useState("");
  return (
    <div>
      <AuthProvider>
        <div className="articles-container">
          <DataTable token={jwtToken} apiUrl={apiUrl} search={search} />
        </div>
      </AuthProvider>
    </div>
  );
};

export default Articles;

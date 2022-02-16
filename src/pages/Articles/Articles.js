import React, { useContext } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import DataTable from "./DataTable/DataTables";

import { ArticlesProvider } from "./ArticlesContext";
import { AuthContext } from "../../AuthContext";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "./Articles.scss";

const Articles = () => {
  const { token } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  setJwtToken(tokenValue);
  return (
    <ArticlesProvider>
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Articles" />
            <DataTable token={jwtToken} />
          </div>
        </div>
      </React.Fragment>
    </ArticlesProvider>
  );
};

export default Articles;

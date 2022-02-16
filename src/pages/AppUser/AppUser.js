import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { AppUserProvider } from "./AppUserContext";

import "./AppUser.scss";

import DataTable from "./DataTable/DataTables";

// Table data

const AppUser = () => {
  return (
    <AppUserProvider>
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="App Users" />
            <DataTable />
          </div>
        </div>
      </React.Fragment>
    </AppUserProvider>
  );
};

export default AppUser;

import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { AdminUserProvider } from "./AdminUserContext";

import DataTable from "./DataTable/DataTables";

// Table data

const AdminUser = () => {
  return (
    <AdminUserProvider>
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Admin Users" />
            <DataTable />
          </div>
        </div>
      </React.Fragment>
    </AdminUserProvider>
  );
};

export default AdminUser;

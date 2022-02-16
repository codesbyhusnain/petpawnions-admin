import React, { useContext } from "react";

import { PetEventsProvider } from "./PetEventsContext";

import DataTable from "./DataTable/DataTables";

import { AuthContext } from "../../AuthContext";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "./PetEvents.scss";

const PetEvents = () => {
  const { token } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  setJwtToken(tokenValue);

  return (
    <PetEventsProvider>
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Pet Events" />
            <DataTable token={jwtToken} />
          </div>
        </div>
      </React.Fragment>
    </PetEventsProvider>
  );
};

export default PetEvents;

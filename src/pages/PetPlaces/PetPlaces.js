import React, { useContext } from "react";

import { PetPlacesProvider } from "./PlacesContext";

import DataTable from "./DataTable/DataTables";

import { AuthContext } from "../../AuthContext";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import "./PetPlaces.scss";

// Table data

const PetPlaces = () => {
  const { token } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  setJwtToken(tokenValue);
  return (
    <PetPlacesProvider>
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="Pet Places" />
            <DataTable token={jwtToken} />
          </div>
        </div>
      </React.Fragment>
    </PetPlacesProvider>
  );
};

export default PetPlaces;

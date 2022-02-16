import React, { useState, createContext, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../AuthContext";

export const PlacesContext = createContext();

export const PetPlacesProvider = (props) => {
  const [placesData, setPlacesData] = useState([]);
  const [state, setState] = useState(0);
  const apiUrl = "http://18.216.174.90:3000/api/petplace";
  const { token } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  setJwtToken(tokenValue);

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  // const response = Axios.get(apiUrl, config);

  useEffect(() => {
    Axios.get(apiUrl, config).then((response) => setPlacesData(response.data));
  }, []);

  const columns = [
    {
      title: "Title",
    },
    {
      title: "Address",
    },
    {
      title: "Longitude",
    },
    {
      title: "Latitude",
    },
    {
      title: "Open Time",
    },
    {
      title: "Close Time",
    },
    {
      title: "Postal Code",
    },
    {
      title: "Category",
    },
    {
      title: "Phone",
    },
    // {
    //   title: "Facebook Link",
    // },
    // {
    //   title: "Instagram Link",
    // },
    // {
    //   title: "Twitter Link",
    // },
    {
      title: "Email",
    },
    {
      title: "URL",
    },
    {
      title: "Action",
    },
  ];

  return (
    <PlacesContext.Provider
      value={{
        columns: columns,
        placesData: [placesData, setPlacesData],
        state: [state, setState],
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
};

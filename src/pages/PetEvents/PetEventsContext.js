import React, { useState, createContext, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../AuthContext";

export const EventsContext = createContext();

export const PetEventsProvider = (props) => {
  const [eventsData, setEventsData] = useState([]);
  const { token } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  setJwtToken(tokenValue);
  const apiUrl = "http://3.15.82.201:3000";
  const getEventsUrl = `${apiUrl}/api/event`;

  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    Axios.get(getEventsUrl, config).then((response) =>
      setEventsData(response.data.data)
    );
  }, []);

  const [state, setState] = useState(0);

  const columns = [
    {
      title: "Title",
    },
    {
      title: "Address",
    },
    {
      title: "Category",
    },
    {
      title: "Start Time",
    },
    {
      title: "End Time",
    },
    {
      title: "Postal Code",
    },
    {
      title: "URL",
    },

    {
      title: "Action",
    },
  ];

  return (
    <EventsContext.Provider
      value={{
        events: [eventsData, setEventsData],
        state: [state, setState],
        columns: columns,
        jwtToken: token,
      }}
    >
      {props.children}
    </EventsContext.Provider>
  );
};

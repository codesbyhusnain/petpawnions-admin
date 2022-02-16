import React, { useState, createContext, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../AuthContext";

export const ArticlesContext = createContext();

export const ArticlesProvider = (props) => {
  const [articles, setArticles] = useState([]);
  const [state, setState] = useState(0);
  const apiUrl = "http://18.216.174.90:3000/api/article";
  const { token } = useContext(AuthContext);
  const tokenValue = String(localStorage.getItem("jwtToken"));
  const [jwtToken, setJwtToken] = token;
  setJwtToken(tokenValue);
  const config = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    Axios.get(apiUrl, config).then((response) => setArticles(response.data));
  }, []);

  const columns = [
    {
      title: "Title",
    },
    {
      title: "Author",
    },
    {
      title: "Likes",
    },
    {
      title: "Views",
    },
    {
      title: "Comments",
    },
    {
      title: "Featured",
    },
    {
      title: "Action",
    },
  ];

  return (
    <ArticlesContext.Provider
      value={{
        articles: [articles, setArticles],
        state: [state, setState],
        columns: columns,
      }}
    >
      {props.children}
    </ArticlesContext.Provider>
  );
};

import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthProtected, setIsAuthprotected] = useState(true);
  const [apiUrl, setApiUrl] = useState("http://3.15.82.201:3000/api/v1");

  return (
    <AuthContext.Provider
      value={{
        token: [authToken, setAuthToken],
        authProtect: [isAuthProtected, setIsAuthprotected],
        api: [apiUrl, setApiUrl],
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

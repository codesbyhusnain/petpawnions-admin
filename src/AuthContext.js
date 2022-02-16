import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthProtected, setIsAuthprotected] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        token: [authToken, setAuthToken],
        authProtect: [isAuthProtected, setIsAuthprotected],
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

import React, { Fragment } from "react";
import "./App.css";
import { publicRoutes, privateRoutes } from "./Routes";
import { Routes } from "react-router-dom";
import { Route } from "react-router";

const App = () => {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route path={route.path} element={<route.component />} key={idx} />
        ))}
        <>
          {privateRoutes.map((route, idx) => (
            <Route path={route.path} element={<route.component />} key={idx} />
          ))}
        </>
      </Routes>
    </div>
  );
};

export default App;

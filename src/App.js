import React, { Fragment } from "react";
import "./App.css";
import { publicRoutes, privateRoutes } from "./Routes";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import NonNavbarLayout from "./Components/Layouts/NonNavbarLayout";
import NavbarLayout from "./Components/Layouts/NavbarLayout";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<NonNavbarLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={<route.component />} key={idx} />
          ))}
        </Route>
        <Route element={<NavbarLayout />}>
          {privateRoutes.map((route, idx) => (
            <Route path={route.path} element={<route.component />} key={idx} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default App;

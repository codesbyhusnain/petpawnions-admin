import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./AuthContext";

import store from "./store";

const app = (
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthProvider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import store from "./app/store.js";
import App from "./App.jsx";
import "./index.css";
import { setCurrentUser } from "./app/userSlice.js";

if (localStorage.getItem("token")) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem("token"))));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

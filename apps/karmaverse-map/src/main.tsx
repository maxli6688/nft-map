import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./main.css";
import App from "./components/layout/Layout";
import "./config/constants/i18n";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById("root")
);
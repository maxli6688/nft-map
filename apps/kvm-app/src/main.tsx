import "react-app-polyfill/ie11";
import React from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./main.css";
import App from "./components/layout/Layout";
import "./config/constants/i18n";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TeamProvider } from "shared/context/TeamContext";

ReactDOM.render(
  <React.StrictMode>
    <TeamProvider>
      <App />
    </TeamProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

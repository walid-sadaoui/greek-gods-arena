import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TeamProvider } from "shared/context/TeamContext";
import { AudioProvider } from "shared/context/audioContext";

ReactDOM.render(
  <React.StrictMode>
    <AudioProvider>
      <TeamProvider>
        <App />
      </TeamProvider>
    </AudioProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

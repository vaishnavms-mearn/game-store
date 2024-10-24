import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HashRouter as Router } from "react-router-dom";
import ContextShare from "./ContextApi/ContextShare";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextShare>
      <Router>
        <App />
      </Router>
    </ContextShare>
  </React.StrictMode>
);


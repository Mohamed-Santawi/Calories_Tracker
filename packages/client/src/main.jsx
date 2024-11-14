import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Modal from "react-modal";

// Bind the modal to the app element (for accessibility)
Modal.setAppElement("#root");
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

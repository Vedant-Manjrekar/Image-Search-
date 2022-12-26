import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
import { ImageProvider } from "./Context/context";
import HomePage from "./Components/home_page/HomePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ImageProvider>
      <HomePage />
    </ImageProvider>
  </React.StrictMode>
);

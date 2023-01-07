import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import WindowProvider from "./context/WindowContext";
import MovieProvider from "./context/MovieContext";
import UserProvider from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <WindowProvider>
          <MovieProvider>
            <App />
          </MovieProvider>
        </WindowProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

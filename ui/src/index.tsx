import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotFound from "./nofound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplyRent from "./applyRent";
import AdminLogin from "./adminLogin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/rent" element={<ApplyRent />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

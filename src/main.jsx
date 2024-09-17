import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import DevPage from "./Components/DevPage";
import AboutMePage from "./Components/AboutMePage";
import { MemoryContextProvider } from "./Context/MemoryContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MemoryContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/aboutme" element={<AboutMePage />} />
      </Routes>
    </MemoryContextProvider>
  </BrowserRouter>
);

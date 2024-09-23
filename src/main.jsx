import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import DevPage from "./Components/DevPage";
import ModelPage from "./Components/ModelPage";
import AboutMePage from "./Components/AboutMePage";
import { ChatContextProvider } from "./Context/ChatContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/aboutme" element={<AboutMePage />} />
      </Routes>
    </ChatContextProvider>
  </BrowserRouter>
);

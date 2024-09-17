import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import { MemoryContextProvider } from "./Context/MemoryContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MemoryContextProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/prueba" element={<h1 className="font-mono text-lg text-slate-800">Desarrollando ...</h1>} />
      </Routes>
    </MemoryContextProvider>
  </BrowserRouter>
);

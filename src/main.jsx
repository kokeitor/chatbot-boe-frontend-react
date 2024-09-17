import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import { MemoryContextProvider } from "./Context/MemoryContext";
import "./Styles/index.css";

createRoot(document.getElementById("root")).render(
  <MemoryContextProvider>
    <App />
  </MemoryContextProvider>
);

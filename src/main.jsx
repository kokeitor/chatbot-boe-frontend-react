import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import { MemoryContextProvider, MemoryContext } from "./Context/MemoryContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemoryContextProvider>
      <App />
    </MemoryContextProvider>
  </StrictMode>
);

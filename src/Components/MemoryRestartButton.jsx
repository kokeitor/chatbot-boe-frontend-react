import "../Styles/memory-restart-buttton.css";
import { useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";

export function MemoryRestartButton() {
  const { restartMemory } = useContext(MemoryContext);
  const restartMemoryText = "Borrar chat";
  return (
    <div className="restart-memory-container">
      <button className="restart-memory-button" onClick={() => restartMemory()}>{restartMemoryText}</button>
    </div>
  );
}

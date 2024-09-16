import { useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";

export function MemoryRestartButton() {
  const { restartMemory } = useContext(MemoryContext);
  const restartMemoryText = "Borrar chat";
  return (
    <div className="container max-w-max mx-auto rounded-md px-1 py-1 mt-1 mb-1">
      <button
        className="hover:scale-105 rounded-md px-2 py-2 mt-1 shadow shadow-red-600 mb-1 font-mono font-bold bg-red-600 hover:bg-red-500"
        onClick={() => restartMemory()}
      >
        {restartMemoryText}
      </button>
    </div>
  );
}

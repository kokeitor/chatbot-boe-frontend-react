import { useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";

export function MemoryRestartButton() {
  const { restartMemory } = useContext(MemoryContext);
  const restartMemoryText = "Borrar chat";
  return (
    <div className="container rounded-md px-1 py-1 mt-1 mb-1 mx-auto my-auto h-auto w-auto">
      <button className="rounded-md px-2 py-2 mt-1 mb-1 font-bold bg-red-600 hover:bg-red-500" onClick={() => restartMemory()}>{restartMemoryText}</button>
    </div>
  );
}

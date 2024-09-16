import { useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";

export function ChatMemory() {
  const { chatMemory } = useContext(MemoryContext);
  const emptyMemory = "BOE chat vacio... ";
  const titleMemory = "BOE chat";
  if (chatMemory.length != 0) {
    return (
      <div className="container rounded-md px-4 py-4 mt-2 mb-2 w-auto bg-yellow-400">
        <h1 className="rounded-md px-2 py-2 mt-2 mb-2 font-bold">
          {titleMemory}
        </h1>
        {chatMemory.map((m, index) => (
          <div
            key={index}
            className="rounded-md mb-8"
          >
            <p className="rounded-md px-2 py-2 bg-blue-500">{`User : ${m.userMessage}`}</p>
            <p className="rounded-md px-2 py-2 mt-1 bg-green-500">{`IA : ${m.iaResponse}`}</p>
          </div>
        ))}
      </div>
    );
  } else if (chatMemory.length == 0) {
    return (
      <div className="container rounded-md px-4 py-4 mt-2 mb-2 w-auto bg-yellow-400">
          <h1 className="rounded-md px-2 py-2 mt-2 mb-2 font-bold">
            {emptyMemory}
          </h1>
      </div>
    );
  }
}

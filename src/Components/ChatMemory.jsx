import "../Styles/chat-memory.css";
import { useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";

export function ChatMemory() {
  const { chatMemory } = useContext(MemoryContext);
  const emptyMemory = "BOE chat vacio... ";
  if (chatMemory.length != 0) {
    return (
      <div className="memory-container">
        {chatMemory.map((m, index) => (
          <div key={index} className="memory-element">
            <p className="user-message">{`User : ${m.userMessage}`}</p>
            <p className="ia-message">{`IA : ${m.iaResponse}`}</p>
          </div>
        ))}
      </div>
    );
  } else if (chatMemory.length == 0) {
    return (
      <div className="memory-container">
        <div className="empty-memory-element">{emptyMemory}</div>
      </div>
    );
  }
}

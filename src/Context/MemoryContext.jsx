import { createContext, useState, useEffect } from "react";

export const MemoryContext = createContext();

export function MemoryContextProvider(props) {
  const [chatMemory, setChatMemory] = useState([]);

  // Log chat memory when it updates
  useEffect(() => {
    chatMemory.forEach((m) =>
      console.log(
        `Memory --> IA: ${m.iaResponse} -- User Message: ${m.userMessage} -- Files: ${m.files}`
      )
    );
  }, [chatMemory]);

  const addMemory = (memory) => {
    setChatMemory((prevMemory) => [...prevMemory, memory]);
  };

  return (
    <MemoryContext.Provider
      value={{
        chatMemory: chatMemory,
        addMemory: addMemory,
      }}
    >
      {props.children}
    </MemoryContext.Provider>
  );
}

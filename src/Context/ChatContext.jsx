import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export function ChatContextProvider(props) {
  const [chatMemory, setChatMemory] = useState([]);
  const [loadingApiResponse, setloadingApiResponse] = useState(false);
  const [errorStatusCode, setErrorStatusCode] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [abortController, setAbortController] = useState(null);

  // useEffect to show toaster component error
  useEffect(() => {
    if (errorStatusCode) {
      toast.error(`Error Status Code : ${errorStatusCode}`, {
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      });
    }
  }, [errorStatusCode]);

  // useEffect to Log the userMessage whenever they change
  useEffect(() => {
    console.log(`User message : ${userMessage}`);
  }, [userMessage]);

  // useEffect Log the files whenever they change
  useEffect(() => {
    files.forEach((f, index) => {
      console.log(`Input file ${index} name : ${f.name}`);
      console.log(`Input file ${index} objet : ${f}`);
    });
  }, [files]);

  // Use effect function to log the context var changes
  useEffect(() => {
    chatMemory.forEach((m, index) =>
      console.log(
        `Memory ${index + 1} --> IA: ${m.iaResponse} -- User Message: ${
          m.userMessage
        } -- Files: ${m.files}`
      )
    );
  }, [chatMemory]);

  useEffect(() => {
    console.log(`Loading Api Response : ${loadingApiResponse} `);
  }, [loadingApiResponse]);
  useEffect(() => {
    console.log(`Error Status code : ${errorStatusCode} `);
  }, [errorStatusCode]);

  // Context functions to change value of context vars
  const addMemory = (memory) => {
    setChatMemory((prevMemory) => [...prevMemory, memory]);
  };
  const restartMemory = () => {
    setChatMemory([]);
  };
  const changeLoadingApiResponse = (state) => {
    if (state === true || state === false) {
      setloadingApiResponse(state);
    } else {
      console.log(`Incorrect value for loadingApiResponse : ${state}`);
    }
  };
  const setErrorStatus = (status) => {
    setErrorStatusCode(status);
  };

  return (
    <MemoryContext.Provider
      value={{
        files: files,
        setFiles: setFiles,
        userMessage: userMessage,
        setUserMessage: setUserMessage,
        abortController: abortController,
        setAbortController: setAbortController,
        chatMemory: chatMemory,
        addMemory: addMemory,
        restartMemory: restartMemory,
        loadingApiResponse: loadingApiResponse,
        changeLoadingApiResponse: changeLoadingApiResponse,
        errorStatusCode: errorStatusCode,
        setErrorStatus: setErrorStatus,
      }}
    >
      {props.children}
    </MemoryContext.Provider>
  );
}

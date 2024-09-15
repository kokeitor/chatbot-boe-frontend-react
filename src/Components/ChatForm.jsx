import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import "../Styles/chat-form.css";
import { useState, useEffect, useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";

function ImageFileLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <BsFileEarmarkArrowUp size={35} />
    </label>
  );
}

function ImageButtonLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <BsArrowUpCircle size={35} />
    </label>
  );
}

export function ChatForm() {
  // const {chatMemory , addMemory} = useContext(MemoryContext);
  const multipleFilesFlag = true;
  const [userMessage, setUserMessage] = useState("");
  const [chatMemory, setChatMemory] = useState([]);
  const [files, setFiles] = useState([]);

  // Log the userMessage whenever they change
  useEffect(() => {
    console.log(`User message : ${userMessage}`);
  }, [userMessage]);

  // Log the files whenever they change
  useEffect(() => {
    console.log(`Input files : ${files}`);
  }, [files]);

  // Log chat memory when it updates
  useEffect(() => {
    chatMemory.forEach((m) =>
      console.log(
        `Memory --> IA: ${m.iaResponse} -- User Message: ${m.userMessage} -- Files: ${m.files}`
      )
    );
  }, [chatMemory]);

  function getIaAnswer(userText, inputFiles) {
    const response = {
      iaResponse: "Eres tonto o que",
      userMessage: userText,
      files: inputFiles,
    };
    const statusCode = 200;
    return [response, statusCode];
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          const [response, statusCode] = getIaAnswer(userMessage, files);
          if (statusCode === 200) {
            setChatMemory((prevMemory) => [...prevMemory, response]);
            // addMemory(response)
          }
          console.log(`Status code : ${statusCode}`);
          console.log(
            `User Message : ${response.userMessage} -- Files : ${response.files} -- IA Response : ${response.iaResponse} `
          );
        }}
      >
        <ImageFileLabel htmlFor="inputFile" labelClassName="inputFileLabel" />
        <input
          type="file"
          id="inputFile"
          accept="application/pdf"
          multiple={multipleFilesFlag}
          className="inputFile"
          onChange={(event) => {
            const selectedFiles = Array.from(event.target.files).map(
              (file) => file.name
            );
            setFiles(selectedFiles);
          }}
        />
        <input
          type="text"
          autoComplete="off"
          minLength={5}
          placeholder="Pregúntame algo sobre tus archivos PDF del BOE ..."
          id="inputText"
          className="inputText"
          required={true}
          onChange={(e) => {
            setUserMessage(e.target.value);
            console.log(`userMessage : ${e.target.value}`); // Log the new message
          }}
        />
        <ImageButtonLabel
          htmlFor="SubmitButton"
          labelClassName="submitButtonLabel"
        />
        <button type="submit" id="SubmitButton" className="SubmitButton" />
      </form>
    </div>
  );
}

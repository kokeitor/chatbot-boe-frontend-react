import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import "../Styles/chat-form.css";
import { useState, useEffect, useContext } from "react";
import { useFetchData } from "../Hooks/useFetchData";
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
  const { addMemory } = useContext(MemoryContext);
  const multipleFilesFlag = true;
  const [userMessage, setUserMessage] = useState("");
  // const [chatMemory, setChatMemory] = useState([]);
  const [files, setFiles] = useState([]);

  // Log the userMessage whenever they change
  useEffect(() => {
    console.log(`User message : ${userMessage}`);
  }, [userMessage]);

  // Log the files whenever they change
  useEffect(() => {
    console.log(`Input files : ${files}`);
  }, [files]);

  function getIaAnswer(userText, inputFiles) {
    const response = {
      iaResponse: "Eres tonto o que",
      userMessage: userText,
      files: inputFiles,
    };
    const statusCode = 200;
    return [response, statusCode];
  }

  const { response, error, loading } = useFetchData(
    "",
    "",
    "https://reqres.in/api/users/2"
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          //const [response, statusCode] = getIaAnswer(userMessage, files);
          //if (statusCode === 200) {
          //  addMemory(response);

          //}
          //console.log(`Status code : ${statusCode}`);
          //console.log(
          //  `User Message : ${response.userMessage} -- Files : ${response.files} -- IA Response : ${response.iaResponse} `
          //);
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

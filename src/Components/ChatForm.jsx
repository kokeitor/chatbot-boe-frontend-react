import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import axios from "axios";
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
  // from useContext
  const { addMemory } = useContext(MemoryContext);
  const { errorStatusCode, setErrorStatus } = useContext(MemoryContext);
  const { loadingApiResponse, changeLoadingApiResponse } =
    useContext(MemoryContext);
  // from useState
  const [userMessage, setUserMessage] = useState("");
  const [files, setFiles] = useState([]);
  const multipleFilesFlag = true;

  // Log the userMessage whenever they change
  useEffect(() => {
    console.log(`User message : ${userMessage}`);
  }, [userMessage]);

  // Log the files whenever they change
  useEffect(() => {
    console.log(`Input files : ${files}`);
  }, [files]);

  // Submit handle function --> post method backend
  const handleSubmit = async (e) => {
    changeLoadingApiResponse(true);
    console.log(e);
    e.preventDefault();

    // Necessary request params
    const urlEndpoint = import.meta.env.VITE_BACK_END_ENDPOINT;
    console.log(`BACK_END_ENDPOINT : ${urlEndpoint}`);
    const userMessageApiModel = {
      userMessage: userMessage,
      files: files,
    };

    // using fetch
    //const headers = {
    //  method: "POST",
    //  body: JSON.stringify(userMessageApiModel),
    //  headers: { "Content-type": "application/json" },
    //};
    // const response = await fetch(urlEndpoint, headers);
    // const data = await response.json();
    // console.log(data);
    // manage API response and adding response to memory context
    // addMemory({
    //   userMessage: data.userMessage,
    //   iaResponse: data.iaResponse,
    //   files: data.files,
    // });

    // using axios
    const responseAxios = await axios.post(urlEndpoint, userMessageApiModel);
    console.log(responseAxios);
    if (responseAxios.status >= 200 && responseAxios.status < 300) {
      e.target.reset();
      changeLoadingApiResponse(false);
      addMemory({
        userMessage: responseAxios.data.userMessage,
        iaResponse: responseAxios.data.iaResponse,
        files: responseAxios.data.files,
      });
    } else {
      changeLoadingApiResponse(false);
      setErrorStatus(responseAxios.status);
      addMemory({
        userMessage: userMessage,
        iaResponse: `Error API response -- Status code : ${responseAxios.status}`,
        files: files,
      });
    }
  };

  if (loadingApiResponse) return <p>Loading...</p>;
  if (errorStatusCode) return <p>Error: {errorStatusCode}</p>;

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
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

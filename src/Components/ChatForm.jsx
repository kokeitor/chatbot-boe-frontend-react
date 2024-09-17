import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import axios from "axios";
import "../Styles/chat-form.css";
import ScaleLoader from "react-spinners/ClipLoader";
import { useState, useEffect, useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";
import toast, { Toaster } from "react-hot-toast";

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
    console.log(`Input files : ${files}`);
  }, [files]);

  // Submit handle function --> post method backend
  const handleSubmit = async (e) => {
    changeLoadingApiResponse(true);
    setErrorStatus(null);
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
    //
    axios
      .post(urlEndpoint, userMessageApiModel)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        toast.success(`API response Status code : ${response.status}`);
        addMemory({
          userMessage: response.data.userMessage,
          iaResponse: response.data.iaResponse,
          files: response.data.files,
        });
      })
      .catch((error) => {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          console.log("error.response : ");
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          console.log("error.request : ");
          console.log(error.request);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log(
            "Algo paso al preparar la petición que lanzo un Error : ",
            error.message
          );
        }
        console.log(error.config);
        console.log(error.toJSON());
        setErrorStatus(error.response.status);
        addMemory({
          userMessage: userMessage,
          iaResponse: "IA Model API Error Response : " + error.message,
          files: files,
        });
      })
      .finally(() => {
        changeLoadingApiResponse(false);
        e.target.reset();
      });
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "green",
              color: "black",
            },
          },
        }}
      />
      {errorStatusCode && (
        <div className="container flex justify-center items-center mb-2 mt-1 max-w-md rounded-md px-4 py-4 w-auto mx-auto">
          <p className="font-mono text-sm text-[#ff2828]">
            Error Status Code : {errorStatusCode}
          </p>
        </div>
      )}
      {loadingApiResponse && (
        <div className="container flex justify-center items-center mb-2 mt-1 max-w-md rounded-md px-4 py-4 w-auto mx-auto">
          <ScaleLoader
            height={20}
            width={10}
            radius={10}
            margin={5}
            color={"#08fa30"}
            loading={true}
            speedMultiplier={1}
          />
        </div>
      )}
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

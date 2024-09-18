import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import axios from "axios";
import "../Styles/chat-form.css";
import ScaleLoader from "react-spinners/ClipLoader";
import { useState, useEffect, useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";
import { modelApi } from "../Apis/modelApi";
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
    files.forEach((f, index) => {
      console.log(`Input file ${index} name : ${f.name}`);
      console.log(`Input file ${index} objet : ${f}`);
    });
  }, [files]);

  // Submit handle function --> post method backend
  const handleSubmit = async (e) => {
    changeLoadingApiResponse(true);
    setErrorStatus(null);
    console.log(e);
    e.preventDefault();

    // Necessary request params
    const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;
    const urlEndpoint = import.meta.env.VITE_BACK_END_ENDPOINT_1;
    console.log(`BACK_END_BASE_URL : ${baseUrl}`);
    console.log(`BACK_END_ENDPOINT_1 : ${urlEndpoint}`);

    // Back-End expected model body params : uploadFiles and userMessage
    const formData = new FormData();
    formData.append("userMessage", userMessage);
    files.forEach((file) => {
      formData.append("uploadFiles", file);
    });

    // logs of the form data content object send to the api endpoint
    console.log(formData);
    formData.keys().forEach((key) => console.log(key));
    formData.values().forEach((val) => console.log(val));

    // Axios Configuration Request
    const axiosConfigRequest = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // Post request to API endpoint
    modelApi
      .post(urlEndpoint, formData, axiosConfigRequest)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        toast.success(`API response Status code : ${response.status}`);
        if (files.length > 0) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-mono font-bold text-[#08fa30]">
                      Archivos subidos con éxito
                    </p>
                    {files.map(function showFiles(f, index) {
                      return (
                        <p
                          className="mt-1 text-sm font-mono text-gray-500"
                          key={index}
                        >
                          {f.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-[#2a63ff] hover:text-[#6d93fc] focus:text-[#6d93fc] hover:bg-[#e0edff] focus:bg-[#d6e4ff] focus:outline-none focus:ring-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ));
        }
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
        setFiles([]);
        setUserMessage("");
        e.target.reset();
      });
  };

  return (
    <div>
      <Toaster
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          success: {
            position: "top-right",
            duration: 3000,
            style: {
              background: "green",
              color: "white",
            },
          },
          custom: {
            duration: 80000,
            position: "top-left",
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
            //const selectedFiles = Array.from(event.target.files).map(
            //  (file) => file.name
            //);
            setFiles(Array.from(event.target.files));
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

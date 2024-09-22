import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import "../Styles/chat-form.css";
import ScaleLoader from "react-spinners/ClipLoader";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { modelApi } from "../Apis/modelApi";
import { handleFormSubmit } from "../Handlers/handlers";
import { FilesCustomToast } from "./FilesCustomToast";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineStopCircle } from "react-icons/md";

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

function AbortImageButtonLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <MdOutlineStopCircle size={35} />
    </label>
  );
}

export function ChatForm() {
  // from useContext
  const {
    userMessage,
    setUserMessage,
    files,
    setFiles,
    restartMemory,
    addMemory,
    errorStatusCode,
    setErrorStatus,
    loadingApiResponse,
    changeLoadingApiResponse,
  } = useContext(ChatContext);

  // from useState
  // const [userMessage, setUserMessage] = useState("");
  // const [files, setFiles] = useState([]);
  const multipleFilesFlag = true;
  const [abortController, setAbortController] = useState(null);

  // Necessary request params
  const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;
  const urlEndpoint = import.meta.env.VITE_BACK_END_ENDPOINT_1;

  // Submit handle function --> post method backend
  const handleSubmit = async (e, customToast) => {
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

    // handle abort controller object set to be used in the abort button
    const controller = new AbortController();
    setAbortController(controller);

    // Axios Configuration Request
    const axiosConfigRequest = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
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
          toast.custom((t) => customToast(t, files));
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
          setErrorStatus(error.response.status);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          console.log("error.request : ");
          console.log(error.request.statusText);
          setErrorStatus(error.request.status);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log(
            "Algo paso al preparar la petición que lanzo un Error : ",
            error.message
          );
          setErrorStatus(error.message);
        }
        console.log(error.config);
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
        setAbortController(null);
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
      <div className="container flex justify-center items-center mb-2 mt-1 max-w-md rounded-md px-4 py-4 w-auto mx-auto">
        <p className="font-mono text-sm text-[#ff2828]">
          {errorStatusCode ? `Error Status Code : ${errorStatusCode}` : ""}
        </p>
      </div>
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
      <form
        className="form"
        onSubmit={(e) => handleFormSubmit(e, FilesCustomToast, urlEndpoint)}
      >
        <ImageFileLabel htmlFor="inputFile" labelClassName="inputFileLabel" />
        <input
          type="file"
          id="inputFile"
          accept="application/pdf"
          multiple={multipleFilesFlag}
          className="inputFile"
          onChange={(event) => {
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
        {loadingApiResponse ? (
          <>
            <AbortImageButtonLabel
              htmlFor="AbortSubmitButton"
              labelClassName="AbortSubmitButtonLabel"
            />
            <button
              type="submit"
              id="AbortSubmitButton"
              className="AbortSubmitButton"
              onClick={() => {
                if (abortController) {
                  abortController.abort();
                  toast("Mensaje cancelado", {
                    position: "top-right",
                    icon: "⛔",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                } else {
                  console.log("Error on the cancelation of the post request");
                }
                setErrorStatus(null);
                setAbortController(null);
                changeLoadingApiResponse(false);
                setFiles([]);
                setUserMessage("");
              }}
            />
          </>
        ) : (
          <>
            <ImageButtonLabel
              htmlFor="SubmitButton"
              labelClassName="submitButtonLabel"
            />
            <button type="submit" id="SubmitButton" className="SubmitButton" />
          </>
        )}
      </form>
    </div>
  );
}

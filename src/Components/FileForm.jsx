import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import "../Styles/chat-form.css";
import ScaleLoader from "react-spinners/ClipLoader";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { modelApi } from "../Apis/modelApi";
import { BsRobot } from "react-icons/bs";
import { FilesCustomToast, FilesDeletedCustomToast } from "./FilesCustomToast";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineStopCircle } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";

function ImageFileLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <FaFilePdf size={35} className="mx-1" />
    </label>
  );
}

function ImageButtonLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <MdFileUpload size={35} className="mx-1" />
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
export function FilesFormManaging(props) {
  // vars from usestsate
  const [files, setFiles] = useState([]);
  const [abortController, setAbortController] = useState(null);
  const [loadingApiResponse, changeLoadingApiResponse] = useState(false);
  const [errorStatusCode, setErrorStatus] = useState(null);

  // local constant vars
  const multipleFilesFlag = true;

  // Necessary request params
  const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;
  console.log(`BACK_END_BASE_URL : ${baseUrl}`);
  const postFileEndpoint = import.meta.env
    .VITE_BACK_END_ENDPOINT_BOE_POST_FILES;
  const deleteFileEndpoint = import.meta.env
    .VITE_BACK_END_ENDPOINT_BOE_DELETE_FILES;

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

  // useEffect to log changes on var from usestate values
  useEffect(() => {
    files.forEach((f, index) => {
      console.log(`Input file ${index} name : ${f.name}`);
      console.log(`Input file ${index} objet : ${f}`);
    });
  }, [files]);

  // Submit handle function --> post method backend
  const handleFileFormSubmit = async (
    e,
    customToast,
    urlEndpoint,
    method = "post"
  ) => {
    changeLoadingApiResponse(true);
    setErrorStatus(null);
    console.log(e);
    e.preventDefault();

    console.log(`BACK_END_ENDPOINT_1 : ${urlEndpoint}`);

    // Back-End expected model body params : uploadFiles and userMessage
    const formData = new FormData();
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
      method: method,
      url: urlEndpoint,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: controller.signal,
      data: method === "post" ? formData : null,
    };

    // Post request to API endpoint
    modelApi(axiosConfigRequest)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response);
        toast.success(`API response Status code : ${response.status}`);
        if (files.length > 0 && method === "post") {
          toast.custom((t) => customToast(t, files));
        } else {
          toast.custom((t) => customToast(t));
        }
        if (method === "post") {
          setFiles(files);
        }
      })
      .catch((error) => {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          console.log("error.response : ");
          console.log(error);
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
        if (method === "post") {
          setFiles([]);
        }
      })
      .finally(() => {
        changeLoadingApiResponse(false);
        setFiles([]);
        setAbortController(null);
        e.target.reset();
      });
  };

  return (
    <>
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
            {`Error Status Code : ${errorStatusCode}`}
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
      <div className="items-center px-2  bg-[#272727] rounded-lg">
        <p className="text-md font-mono text-white font-bold text-center px-2 py-2 mb-2 mt-2">
          BOE PDFs
        </p>
        <div className="container flex justify-center items-center rounded-md px-1 py-2 w-auto mx-2">
          <form
            className="flex w-min items-center"
            onSubmit={(e) => {
              handleFileFormSubmit(
                e,
                FilesDeletedCustomToast,
                deleteFileEndpoint,
                "delete"
              );
            }}
          >
            <button
              className="bg-red-500 text-xs hover:bg-red-700 text-black font-bold font-mono px-1 py-1 mx-1 rounded-lg"
              type="submit"
            >
              Eliminar archivos
            </button>
          </form>
        </div>
        <div className="container flex justify-center items-center rounded-md px-1 py-2 w-auto mx-auto">
          <form
            className="flex w-min items-center px-2"
            onSubmit={(e) => {
              handleFileFormSubmit(
                e,
                FilesCustomToast,
                postFileEndpoint,
                "post"
              );
            }}
          >
            <ImageFileLabel
              htmlFor="inputFile"
              labelClassName="inputFileLabel"
            />
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
                      console.log(
                        "Error on the cancelation of the post request"
                      );
                    }
                    setErrorStatus(null);
                    setAbortController(null);
                    changeLoadingApiResponse(false);
                    setFiles([]);
                  }}
                />
              </>
            ) : (
              <>
                <ImageButtonLabel
                  htmlFor="SubmitButton"
                  labelClassName="submitButtonLabel"
                />
                <button
                  type="submit"
                  id="SubmitButton"
                  className="SubmitButton"
                />
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

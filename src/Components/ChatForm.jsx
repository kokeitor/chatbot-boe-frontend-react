import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import "../Styles/chat-form.css";
import ScaleLoader from "react-spinners/ClipLoader";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { modelApi } from "../Apis/modelApi";
import { BsRobot } from "react-icons/bs";
import { FilesCustomToast } from "./FilesCustomToast";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineStopCircle } from "react-icons/md";
import { FilesFormManaging } from "./FileForm";
import { FaQuestion } from "react-icons/fa";

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
      <FaQuestion size={35} />
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
  // vars from usestsate
  const [userMessage, setUserMessage] = useState("");
  const [iaResponse, setIaResponse] = useState("");
  const [abortController, setAbortController] = useState(null);
  const [streamMode, setStreamMode] = useState("stream");
  const [urlEndpoint, setUrlEndpoint] = useState(
    import.meta.env.VITE_BACK_END_ENDPOINT_STREAM
  );

  // vars from useContext
  const {
    chatMemory,
    addMemory,
    errorStatusCode,
    setErrorStatus,
    loadingApiResponse,
    changeLoadingApiResponse,
  } = useContext(ChatContext);

  // Necessary request params
  const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;

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
    console.log(`User message : ${userMessage}`);
  }, [userMessage]);

  // Submit Stream handle function
  const handleStreamSubmit = async (e, customToast, baseUrl) => {
    setIaResponse("");
    changeLoadingApiResponse(true);
    setErrorStatus(null);
    console.log(e);
    e.preventDefault();

    // logs
    console.log(`BACK_END_ENDPOINT_SREAM ${urlEndpoint}`);

    try {
      // Back-End FastAPI expected model body params : uploadFiles and userMessage
      const formData = new FormData();
      formData.append("userMessage", userMessage);

      // logs of the form data content object send to the api endpoint
      console.log(formData);
      formData.keys().forEach((key) => console.log(key));
      formData.values().forEach((val) => console.log(val));

      // handle abort controller object set to be used in the abort button
      const controller = new AbortController();
      setAbortController(controller);

      // Axios Configuration Request
      const fetchStreamConfig = {
        method: "POST",
        body: formData, // Sending form data
        signal: controller.signal,
      };

      const response = await fetch(baseUrl + urlEndpoint, fetchStreamConfig);

      if (!response.ok) {
        setErrorStatus(response.status);
        throw new Error(`HTTP Streaming error! status: ${response.status}`);
      }

      toast.success(`API Streaming response Status code : ${response.status}`);
      if (files.length > 0) {
        toast.custom((t) => customToast(t, files));
      }

      // Handle the stream using the reader
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      let done = false;
      while (!done) {
        const { value: value, done: streamDone } = await reader.read();
        done = streamDone;
        result += decoder.decode(value, { stream: true });

        // Update the IA response incrementally
        setIaResponse((prev) => prev + decoder.decode(value, { stream: true }));
      }
      // add all info to chat memory
      addMemory({
        userMessage: userMessage,
        iaResponse: result,
      });
      console.log("Stream completed:", result);
    } catch (error) {
      setErrorStatus(error);
      console.error("Error during stream:", error);
    } finally {
      changeLoadingApiResponse(false);
      setUserMessage("");
      setAbortController(null);
      e.target.reset();
    }
  };

  // Submit handle function --> post method backend
  const handleSubmit = async (e, customToast, baseUrl) => {
    changeLoadingApiResponse(true);
    setErrorStatus(null);
    console.log(e);
    e.preventDefault();

    console.log(`BACK_END_BASE_URL : ${baseUrl}`);
    console.log(`BACK_END_ENDPOINT_1 : ${urlEndpoint}`);

    // Back-End expected model body params : uploadFiles and userMessage
    const formData = new FormData();
    formData.append("userMessage", userMessage);

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
      {errorStatusCode && (
        <div className="container flex justify-center items-center mb-2 mt-1 max-w-md rounded-md px-4 py-4 w-auto mx-auto">
          <p className="font-mono text-sm text-[#ff2828]">
            {`Error Status Code : ${errorStatusCode}`}
          </p>
        </div>
      )}

      {streamMode === "stream" && (
        <div className="container rounded-md px-4 py-4 mt-12 w-auto mx-auto shadow-md hover:shadow-lg shadow-[#000000] hover:shadow-[#000000] bg-[#272727]">
          <div className="container flex-center px-4 py-2 mb-3 mt-1 rounded-md">
            <h1 className="text-center mt-2 text-xl text-[#08fa30] font-bold font-mono">
              {"Streaming Mode"}
            </h1>
          </div>
          <div>
            <div className="py-2 px-2">
              <div className="flex mb-1 mt-1">
                <BsRobot
                  size={25}
                  title="IA"
                  color="#08fa30"
                  className="ml-auto"
                />
              </div>
              {iaResponse && (
                <div className="flex rounded-md bg-[#08fa30]">
                  <p className="max-w-max px-2 py-2 font-mono hover:font-bold">
                    {iaResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
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
      <div className="flex justify-around items-center px-2 mt-5 gap-4 rounded-lg">
        <div className="w-1/6 px-2 rounded-lg shadow-md hover:shadow-lg shadow-[#000000] hover:shadow-[#000000] bg-[#272727]">
          <FilesFormManaging />
        </div>

        <div className="w-5/6 mx-2">
          <form
            className="form"
            onSubmit={(e) => {
              if (streamMode === "stream") {
                handleStreamSubmit(e, FilesCustomToast, baseUrl);
              } else {
                handleSubmit(e, FilesCustomToast, baseUrl);
              }
            }}
          >
            <select
              className="mb-2 mt-2 py-1 text-center text-sm max-w-fit font-mono font-bold text-[#000000] bg-[#e5dede] rounded-md"
              value={streamMode}
              onChange={(e) => {
                console.log(e.target.value);
                setStreamMode(e.target.value);
                if (e.target.value == "stream") {
                  setUrlEndpoint(import.meta.env.VITE_BACK_END_ENDPOINT_STREAM);
                } else if (e.target.value == "non-stream") {
                  setUrlEndpoint(import.meta.env.VITE_BACK_END_ENDPOINT_1);
                }
              }}
            >
              <option value="stream">Streaming Mode</option>
              <option value="non-stream">Non-Streaming Mode</option>
            </select>

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
                      console.log(
                        "Error on the cancelation of the post request"
                      );
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
    </div>
  );
}

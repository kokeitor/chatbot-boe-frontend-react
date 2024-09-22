import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { modelApi } from "../Apis/modelApi";
import { Toaster, toast } from "react-hot-toast";

export function MemoryRestartButton() {
  const {
    restartMemory,
    addMemory,
    errorStatusCode,
    setErrorStatus,
    loadingApiResponse,
    changeLoadingApiResponse,
  } = useContext(ChatContext);

  const restartMemoryText = "Borrar chat";
  const handleOnClick = (e) => {
    changeLoadingApiResponse(true);
    setErrorStatus(null);
    console.log(e);
    // Necessary request params
    const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;
    const urlEndpoint = import.meta.env.VITE_BACK_END_ENDPOINT_2;
    console.log(`BACK_END_BASE_URL : ${baseUrl}`);
    console.log(`BACK_END_ENDPOINT_2 : ${urlEndpoint}`);
    // get axios request
    modelApi
      .get(urlEndpoint)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        toast.success(`API response Status code : ${response.status}`);
        restartMemory();
        addMemory({
          userMessage: "Quiero borrar el chat",
          iaResponse: response.data.severResponse,
          files: [],
        });
        setErrorStatus(null);
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
          console.log(error.request);
          setErrorStatus(error.request);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log(
            "Error en el intento de reinicio de memoria" + error.message
          );
          setErrorStatus(error.message);
        }
        console.log(error.config);
        addMemory({
          userMessage: "...",
          iaResponse:
            "Error en el intento de reinicio de memoria : " + error.message,
          files: [],
        });
      })
      .finally(() => {
        changeLoadingApiResponse(false);
      });
  };
  return (
    <div className="container max-w-max mx-auto rounded-md px-1 py-1 mt-1 mb-1">
      <button
        className="hover:scale-105 rounded-md px-2 py-2 mt-1 shadow shadow-red-600 mb-1 font-mono font-bold bg-red-600 hover:bg-red-500"
        onClick={handleOnClick}
      >
        {restartMemoryText}
      </button>
    </div>
  );
}

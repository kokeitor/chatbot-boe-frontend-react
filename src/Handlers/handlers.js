import { modelApi } from "../Apis/modelApi.js";
import { saveAs } from "file-saver";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext.jsx";

// Function that handles the download a the pdf stored in the backend.
export const handleDownloadTfmPdf = (setTfmLoading, urlEndpointTfm) => {
  setTfmLoading(true);
  // Axios Configuration Request
  const axiosConfigRequest = {
    responseType: "blob",
  };

  // Axios configuration to handle binary response
  modelApi
    .get(urlEndpointTfm, axiosConfigRequest)
    .then((response) => {
      // Save the file using FileSaver
      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, "boe-chatbot-backend-model-tfm.pdf");
      toast.success("TFM PDF downloaded successfully!");
    })
    .catch((error) => {
      console.error("Error downloading TFM PDF:", error);
      toast.error("Failed to download TFM PDF");
    })
    .finally(() => {
      setTfmLoading(false);
    });
};

// Submit handle function --> post method backend
export const handleFormSubmit = async (e, customToast, urlEndpoint) => {
  const {
    userMessage,
    setUserMessage,
    files,
    setFiles,
    setAbortController,
    addMemory,
    setErrorStatus,
    changeLoadingApiResponse,
  } = useContext(ChatContext);

  changeLoadingApiResponse(true);
  setErrorStatus(null);
  console.log(e);
  e.preventDefault();

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

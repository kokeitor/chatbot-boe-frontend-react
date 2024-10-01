import { modelApi } from "../Apis/modelApi.js";
import { saveAs } from "file-saver";

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
export function FileFormPost(props) {
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
}

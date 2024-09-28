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

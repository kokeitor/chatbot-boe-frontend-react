import { useEffect, useState } from "react";
import { modelApi } from "../Apis/modelApi.js";

export const useFetchDiagrams = (urlEndpointD1, urlEndpointD2) => {
  const [diagram1, setDiagram1] = useState();
  const [loadingDiagram1, setLoadingDiagram1] = useState(true);
  const [diagram2, setDiagram2] = useState();
  const [loadingDiagram2, setLoadingDiagram2] = useState(true);

  useEffect(() => {
    // Axios Configuration Request
    const axiosConfigRequest = {
      responseType: "blob",
    };

    //  Get D1
    modelApi
      .get(urlEndpointD1, axiosConfigRequest)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response.data);
        console.log(response.status);
        // Create a URL from the response blob and set it to state
        const imageUrl = URL.createObjectURL(response.data);
        setDiagram1(imageUrl);
      })
      .catch((error) => {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          console.log("error.response : ");
          console.log(error);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          console.log("error.request : ");
          console.log(error.request.statusText);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log(
            "Algo paso al preparar la petición que lanzo un Error : ",
            error.message
          );
        }
        console.log(error.config);
      })
      .finally(() => {
        console.log("Final get diagrama");
        setLoadingDiagram1(false);
      });
    //  Get D2
    modelApi
      .get(urlEndpointD2, axiosConfigRequest)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response.data);
        console.log(response.status);
        // Create a URL from the response blob and set it to state
        const imageUrl = URL.createObjectURL(response.data);
        setDiagram2(imageUrl);
      })
      .catch((error) => {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado
          // que esta fuera del rango de 2xx
          console.log("error.response : ");
          console.log(error);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
          // http.ClientRequest en node.js
          console.log("error.request : ");
          console.log(error.request.statusText);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log(
            "Algo paso al preparar la petición que lanzo un Error : ",
            error.message
          );
        }
        console.log(error.config);
      })
      .finally(() => {
        console.log("Final get diagrama");
        setLoadingDiagram2(false);
      });
  }, []);

  return {
    diagram1: diagram1,
    loadingDiagram1: loadingDiagram1,
    diagram2: diagram2,
    loadingDiagram2: loadingDiagram2,
  };
};

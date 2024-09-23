import { useEffect, useState } from "react";
import { modelApi } from "../Apis/modelApi.js";

export const useFetchGraphWflow = (urlEndpoint) => {
  const [graph, setGraph] = useState();
  const [loadingGraph, setLoadingGraph] = useState(true);

  useEffect(() => {
    // Axios Configuration Request
    const axiosConfigRequest = {
      responseType: "blob",
    };

    //  Get D1
    modelApi
      .get(urlEndpoint, axiosConfigRequest)
      .then((response) => {
        console.log("Api response correcta:");
        console.log(response.data);
        console.log(response.status);
        // Create a URL from the response blob and set it to state
        const imageUrl = URL.createObjectURL(response.data);
        setGraph(imageUrl);
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
        setLoadingGraph(false);
      });
  }, []);

  return {
    graph: graph,
    loadingGraph: loadingGraph,
  };
};

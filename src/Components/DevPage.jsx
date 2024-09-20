import { Card } from "./Card";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiLangchain } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";
import pineconeLogoSrc from "../assets/pinecone_logo.jpg";
import { useEffect, useState } from "react";
import { modelApi } from "../Apis/modelApi";
import { saveAs } from "file-saver";
import { NavBar } from "./NavBar";

function DevPage() {
  const [diagram1, setDiagram1] = useState();
  const [diagram2, setDiagram2] = useState();
  const [tfmLoading, setTfmLoading] = useState(false);

  useEffect(() => {
    // Necessary request params
    const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;
    const urlEndpointD1 = import.meta.env.VITE_BACK_END_ENDPOINT_D_1;
    const urlEndpointD2 = import.meta.env.VITE_BACK_END_ENDPOINT_D_2;
    console.log(`BACK_END_BASE_URL : ${baseUrl}`);
    console.log(`VITE_BACK_END_ENDPOINT_D_1 : ${urlEndpointD1}`);
    console.log(`VITE_BACK_END_ENDPOINT_D_2 : ${urlEndpointD2}`);

    // Axios Configuration Request
    const axiosConfigRequest = {
      responseType: "blob",
    };

    //  Diagram 1 get
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
        console.log("Finalzada get diagrama 1");
      });
    // Diagram 2 get
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
        console.log("Finalzada get diagrama 1");
      });
  }, []);

  //
  const downloadTfmPdf = () => {
    setTfmLoading(true);
    // TFM endpoint
    const urlEndpointTfm = import.meta.env.VITE_BACK_END_ENDPOINT_TFM;
    console.log(`VITE_BACK_END_ENDPOINT_TFM : ${urlEndpointTfm}`);

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
        saveAs(blob, "tfm.pdf");
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
  return (
    <main className="h-auto w-full bg-neutral-700">
      <NavBar />
      <div className="h-min w-auto rounded-lg grid grid-cols-7 gap-4 px-4 py-4">
        <Card
          href="https://es.react.dev/"
          title="React JS"
          iconColor="#3adee4"
          text="A JavaScript library used to build the UI web or Front-end of an App."
          icon={FaReact}
        />
        <Card
          href="https://vitejs.dev/guide/why.html"
          title="Vite"
          iconColor="#e43ae4"
          text="A tool that allows configuring a development environment for Vue, TezJS, and React frameworks."
          icon={SiVite}
        />
        <Card
          href="https://nodejs.org/en/about"
          title="Node.js"
          iconColor="#31b13c"
          text="A runtime environment that allows JavaScript to be executed on the server side."
          icon={FaNodeJs}
        />
        <Card
          href="https://tailwindcss.com/"
          title="Tailwind CSS"
          iconColor="#38BDF8 "
          text="A CSS framework packed with classes to apply styles."
          icon={RiTailwindCssFill}
        />
        <Card
          href="https://fastapi.tiangolo.com/"
          title="FastApi"
          iconColor="#009688 "
          text="A Python web framework for building APIs which allows high-performance Back-End developing and host the agentic LLM graph that process the user querys."
          icon={SiFastapi}
        />
        <Card
          href="https://www.langchain.com/"
          title="LangChain and LangGraph"
          iconColor="#0052CC"
          text="LangChain is a framework to build with LLMs 
          by chaining interoperable components. LangGraph is the framework for building controllable agentic workflows which is running on the Back-End"
          icon={SiLangchain}
        />
        <Card
          href="https://huggingface.co/"
          title="HuggingFace"
          iconColor="#FFD700"
          text="Hugging Face is a machine learning (ML) and data science platform and community that helps users build, deploy and train machine 
          learning models. It provides the infrastructure to demo, run and deploy artificial intelligence (AI) in live applications"
          icon={SiHuggingface}
        />
        <Card
          href="https://www.pinecone.io/"
          title="Pinecone Vector DataBase"
          text="AI is a leading provider of vector database technology, 
          offering a fully managed, scalable, and highly performant platform for storing, indexing, and querying vector data."
          src={pineconeLogoSrc}
          icon={false}
        />
        <div>
          <button
            onClick={downloadTfmPdf}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={tfmLoading}
          >
            {tfmLoading ? "Downloading..." : "Download TFM PDF"}
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center my-8">
        {diagram1 ? (
          <img
            src={diagram1}
            alt="Diagrama_1"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        ) : (
          <p className="text-white">Loading diagram 2...</p>
        )}
      </div>
      <div className="flex justify-center items-center my-8">
        {diagram2 ? (
          <img
            src={diagram2}
            alt="Diagrama_2"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        ) : (
          <p className="text-white">Loading diagram 2...</p>
        )}
      </div>
    </main>
  );
}

export default DevPage;

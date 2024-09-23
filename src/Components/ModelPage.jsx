import { useState } from "react";
import { useFetchDiagrams } from "../Hooks/useFetchDiagrams";
import { useFetchGraphWflow } from "../Hooks/useFetchGraphWflow";
import { handleDownloadTfmPdf } from "../Handlers/handlers";
import { NavBar } from "./NavBar";
import { CopyRightFooter } from "./CopyRightFooter";

function DevPage() {
  const [tfmLoading, setTfmLoading] = useState(false);

  // TFM endpoint
  const urlEndpointTfm = import.meta.env.VITE_BACK_END_ENDPOINT_TFM;
  console.log(`VITE_BACK_END_ENDPOINT_TFM : ${urlEndpointTfm}`);

  // Custom hook-Fetch params
  const baseUrl = import.meta.env.VITE_BACK_END_BASE_URL;
  const urlEndpointD1 = import.meta.env.VITE_BACK_END_ENDPOINT_D_1;
  const urlEndpointD2 = import.meta.env.VITE_BACK_END_ENDPOINT_D_2;
  const urlEndpointgraph = import.meta.env.VITE_BACK_END_ENDPOINT_GRAPH;
  console.log(`BACK_END_BASE_URL : ${baseUrl}`);
  console.log(`VITE_BACK_END_ENDPOINT_D_1 : ${urlEndpointD1}`);
  console.log(`VITE_BACK_END_ENDPOINT_D_2 : ${urlEndpointD2}`);
  console.log(`VITE_BACK_END_ENDPOINT_GRAPH : ${urlEndpointgraph}`);

  // Custom Hook calling
  const { diagram1, loadingDiagram1, diagram2, loadingDiagram2 } =
    useFetchDiagrams(
      import.meta.env.VITE_BACK_END_ENDPOINT_D_1,
      import.meta.env.VITE_BACK_END_ENDPOINT_D_2
    );
  const { graph, loadingGraph } = useFetchGraphWflow(
    import.meta.env.VITE_BACK_END_ENDPOINT_GRAPH
  );

  console.log(diagram1);
  console.log(diagram2);
  console.log(graph);
  console.log(loadingDiagram1);
  console.log(loadingDiagram2);
  console.log(loadingGraph);

  return (
    <main className="h-auto w-full bg-neutral-700">
      <NavBar />
      <div className="flex justify-center items-center mt-12">
        <p className="bg-[#acacac] px-2 py-2 mb-2 rounded-lg hover:scale-105 font-bold text-md text-white font-mono">
          Model Technical Documentation
        </p>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => handleDownloadTfmPdf(setTfmLoading, urlEndpointTfm)}
          className="bg-blue-500 hover:bg-blue-700 text-white mt-2 font-mono text-sm py-2 px-4 rounded"
          disabled={tfmLoading}
        >
          {tfmLoading
            ? "Downloading..."
            : "Download boe-chatbot-backend-model-documentation"}
        </button>
      </div>
      <div className="flex justify-center items-center mt-12">
        <p className="bg-[#acacac] rounded-lg hover:scale-105 font-bold text-md text-white font-mono py-2 px-2">
          Model FlowCharts
        </p>
      </div>
      {loadingDiagram1 && (
        <p className="text-center rounded-lg font-bold text-sm text-white font-mono mx-auto  max-w-md my-auto mt-2 mb-2 py-2 px-2">
          Loading FlowChart 1...
        </p>
      )}
      {loadingDiagram2 && (
        <p className="text-center rounded-lg font-bold text-sm text-white font-mono mx-auto  max-w-md my-auto mt-2 mb-2 py-2 px-2">
          Loading FlowChart 2...
        </p>
      )}
      <div className="flex justify-center items-center py-4 px-4">
        {diagram1 && (
          <img
            src={diagram1}
            alt="Diagrama_1"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="flex justify-center items-center mb-4 py-4 px-4">
        {diagram2 && (
          <img
            src={diagram2}
            alt="Diagrama_1"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="flex justify-center items-center mt-12">
        <p className="bg-[#acacac] rounded-lg hover:scale-105 font-bold text-md text-white font-mono py-2 px-2">
          Model Multi-Agent LangGraph Logic WorkFlow
        </p>
      </div>
      {loadingGraph && (
        <p className="text-center rounded-lg font-bold text-sm text-white font-mono mx-auto  max-w-md my-auto mt-2 mb-2 py-2 px-2">
          Loading Graph WorkFlow...
        </p>
      )}
      <div className="flex justify-center items-center mb-4 py-4 px-4">
        {graph && (
          <img
            src={graph}
            alt="Graph_WF"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        )}
      </div>
      <CopyRightFooter />
    </main>
  );
}

export default DevPage;

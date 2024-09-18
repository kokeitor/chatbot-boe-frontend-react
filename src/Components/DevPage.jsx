import { Card } from "./Card";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiLangchain } from "react-icons/si";
import { SiHuggingface } from "react-icons/si";
import pineconeLogoSrc from "../assets/pinecone_logo.jpg";

function DevPage() {
  return (
    <main className="h-screen w-full bg-neutral-700">
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
      </div>
    </main>
  );
}

export default DevPage;

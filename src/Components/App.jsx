import BOELogo from "../assets/BOE_logo.svg";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { SiFastapi } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri"
import { FaNodeJs } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ChatForm } from "./ChatForm";
import { Card } from "./Card";
import { ChatMemory } from "./ChatMemory";
import { MemoryRestartButton } from "./MemoryRestartButton";

function App() {
  return (
    <main className="h-auto w-full bg-neutral-700 px-4 py-4">
      <div className="container rounded-lg px-4 py-4 mx-auto my-auto bg-slate-500">
        <a href="https://www.boe.es/" target="_blank" rel="noopener noreferrer">
          <img
            src={BOELogo}
            className="mx-auto block h-24 p-4 hover:scale-110 transition transform duration-200 hover:drop-shadow-lg"
            onMouseOver={(e) =>
              (e.currentTarget.style.filter = "drop-shadow(0 0 2em #1875f0)")
            }
            onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
            alt="BOE logo"
          />
        </a>
      </div>
      <div className="container shadow-none shadow-slate-500 max-w-auto rounded-lg px-2 py-2 mt-4 mb-4 mx-auto bg-slate-500">
        <ChatMemory />
        <ChatForm />
        <MemoryRestartButton />
      </div>
      <div className="h-min w-full rounded-lg grid grid-cols-7 gap-4 px-4 py-4 bg-[#000000]">
        <Card
          href="https://es.react.dev/"
          title="React"
          iconColor="#3adee4"
          text="UI web or Front-end built using this JavaScript library."
          icon={FaReact}
        />
        <Card
          href="https://vitejs.dev/guide/why.html"
          title="Vite"
          iconColor="#e43ae4"
          text="Built with this tool that allows configuring a development environment for Vue, TezJS, and React frameworks."
          icon={SiVite}
        />
        <Card
          href="https://nodejs.org/en/about"
          title="Node.js"
          iconColor="#31b13c"
          text="Built using this runtime environment that allows JavaScript to be executed on the server side."
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
          text="Back-end developed using this high-performance, web framework for building APIs with Python."
          icon={SiFastapi}
        />
        <Card
          href="https://github.com/kokeitor"
          title="GitHub"
          iconColor="#000000"
          text="Check out my open-source projects and contributions."
          icon={FaGithub}
        />
        <Card
          href="https://www.linkedin.com/in/jorgeresinomartin/"
          title="LinkedIn"
          iconColor="#0077B5 "
          text="Connect with me professionally."
          icon={FaLinkedin}
        />
      </div>
    </main>
  );
}

export default App;

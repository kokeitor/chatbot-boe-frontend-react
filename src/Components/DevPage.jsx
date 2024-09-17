import { Card } from "./Card";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";

function DevPage() {
  return (
    <main className="h-full w-full bg-neutral-700 px-4 py-4">
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
      </div>
    </main>
  );
}

export default DevPage;

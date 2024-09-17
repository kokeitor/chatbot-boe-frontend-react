import { Card } from "./Card";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function AboutMePage() {
  return (
    <main className="h-full w-full bg-neutral-700 px-4 py-4">
      <div className="h-min w-full rounded-lg grid grid-cols-7 gap-4 px-4 py-4 bg-[#000000]">
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

export default AboutMePage;

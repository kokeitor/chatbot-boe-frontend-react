import BOELogo from "../assets/BOE_logo.png";
import { ChatForm } from "./ChatForm";
import { ChatMemory } from "./ChatMemory";
import { MemoryRestartButton } from "./MemoryRestartButton";
import "../Styles/app.css";

function App() {
  return (
    <>
      <div>
        <a href="https://www.boe.es/">
          <img src={BOELogo} className="boeLogo" alt="BOE logo" />
        </a>
      </div>
      <ChatMemory />
      <ChatForm />
      <MemoryRestartButton />
    </>
  );
}

export default App;

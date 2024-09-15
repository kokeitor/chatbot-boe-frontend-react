import BOELogo from "../assets/BOE_logo.png";
import { ChatForm } from "./ChatForm";
import { ChatMemory } from "./ChatMemory";
import { MemoryContextProvider, MemoryContext} from "../Context/MemoryContext";
import "../Styles/app.css";
import { useContext } from "react";


function App() {
  return (
    <>
      <MemoryContextProvider>
        <div>
          <a href="https://www.boe.es/">
            <img src={BOELogo} className="boeLogo" alt="BOE logo" />
          </a>
        </div>
        <ChatMemory />
        <ChatForm />
      </MemoryContextProvider>
    </>
  );
}

export default App;

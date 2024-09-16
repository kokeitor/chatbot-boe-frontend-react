import BOELogo from "../assets/BOE_logo.png";
import { ChatForm } from "./ChatForm";
import { ChatMemory } from "./ChatMemory";
import { MemoryRestartButton } from "./MemoryRestartButton";

function App() {
  return (
    <main className="h-auto w-auto rounded-md bg-neutral-700 px-4 py-4">
      <div className="rounded-md px-4 py-4 mx-auto my-auto bg-slate-500">
        <a href="https://www.boe.es/" target="_blank" rel="noopener noreferrer">
          <img
            src={BOELogo}
            className="mx-auto block h-24 p-4 transition hover:filter hover:drop-shadow-lg"
            style={{ filter: "none" }}
            onMouseOver={(e) =>
              (e.currentTarget.style.filter = "drop-shadow(0 0 2em #22c55e)")
            }
            onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
            alt="BOE logo"
          />
        </a>
      </div>
      <div className="container max-w-auto rounded-md px-2 py-2 mt-4 mb-4 mx-auto bg-slate-500">
        <ChatMemory />
        <ChatForm />
        <MemoryRestartButton />
      </div>
    </main>
  );
}

export default App;

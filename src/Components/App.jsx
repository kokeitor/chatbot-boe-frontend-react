import BOELogo from "../assets/BOE_logo.svg";
import { ChatForm } from "./ChatForm";
import { NavBar } from "./NavBar";
import { ChatMemory } from "./ChatMemory";
import { MemoryRestartButton } from "./MemoryRestartButton";
import { CopyRightFooter } from "./CopyRightFooter";

function App() {
  return (
    <main className="h-auto w-full bg-neutral-700">
      <NavBar />
      <div className="container rounded-lg max-w-md mx-auto px-4 py-4  mt-12 bg-slate-500 shadow-md hover:shadow-xl shadow-[#000000] hover:shadow-[#000000]">
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
      <div className="container rounded-lg shadow-none max-w-7xl px-2 py-2 mt-3 mb-12 mx-auto">
        <ChatMemory />
        <ChatForm />
        <MemoryRestartButton />
      </div>
      <CopyRightFooter />
    </main>
  );
}

export default App;

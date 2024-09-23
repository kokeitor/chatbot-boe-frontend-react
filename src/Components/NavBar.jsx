import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <div className="h-min w-full flex justify-center items-center px-4 py-4 bg-[#404040]">
      <div className="flex justify-center items-center gap-4">
        <div className="hover:scale-105 text-white font-mono text-xs bg-[#acacac] p-2 rounded-lg flex justify-center items-center">
          <Link to="/">
            <h1>{"BOE ChatBot"}</h1>
          </Link>
        </div>
        <div className="hover:scale-105 text-white font-mono text-xs bg-[#acacac] p-2 rounded-lg flex justify-center items-center">
          <Link to="/model">
            <h1>{"BOE model"}</h1>
          </Link>
        </div>
        <div className="hover:scale-105 text-white font-mono text-xs bg-[#acacac] p-2 rounded-lg flex justify-center items-center">
          <Link to="/dev">
            <h1>{"Developer tools"}</h1>
          </Link>
        </div>
        <div className="hover:scale-105 text-white font-mono text-xs bg-[#acacac] p-2 rounded-lg flex justify-center items-center">
          <Link to="/aboutme">
            <h1>{"About me"}</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

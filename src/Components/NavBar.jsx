import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <header className="flex jus items-center my-3">
      <div className="h-min w-full rounded-lg grid grid-cols-7 gap-4 px-4 py-4 bg-[#000000]">
        <div className="text-white font-mono text-xs max-w-max bg-[#acacac] items-center p-2 rounded-lg">
          <Link to="/dev">
            <h1 className="">{"Developer tools"}</h1>
          </Link>
        </div>
        <div className="text-white font-mono text-xs max-w-max bg-[#acacac] items-center p-2 rounded-lg">
          <Link to="/aboutme">
            <h1 className="">{"About me"}</h1>
          </Link>
        </div>
      </div>
    </header>
  );
}

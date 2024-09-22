import { useContext } from "react";
import { MemoryContext } from "../Context/ChatContext";
import { BsRobot } from "react-icons/bs";
import { PiUserFill } from "react-icons/pi";

export function ChatMemory() {
  const { chatMemory } = useContext(ChatContext);
  const emptyMemory = "BOE CHAT";
  const titleMemory = "BOE CHAT";

  if (chatMemory.length != 0) {
    return (
      <div className="container max-w-md rounded-md px-4 py-4 mt-2 mb-5 w-auto mx-auto shadow-md hover:shadow-xl shadow-[#000000] hover:shadow-[#000000] bg-gray-600">
        <div className="container flex-center px-4 py-2 mb-5 mt-1 rounded-md bg-slate-500">
          <h1 className="text-center mt-2 mb-2 text-xl text-white font-bold font-mono">
            {titleMemory}
          </h1>
        </div>
        {chatMemory.map((m, index) => (
          <div
            key={index}
            className="font-mono rounded-md mb-8 mx-auto h-auto w-auto"
          >
            <div className="flex mb-1">
              <PiUserFill
                size={25}
                title="User"
                color="#2a63ff"
                className="mr-auto"
              />
            </div>

            {/* User message container */}
            <div className="flex justify-start">
              {/* Align to the left */}
              <p className="inline-block max-w-max rounded-md px-2 py-2 hover:font-bold bg-[#2a63ff]">
                {`${m.userMessage}`}
              </p>
            </div>

            <div className="flex mb-1 mt-1">
              <BsRobot
                size={25}
                title="IA"
                color="#08fa30"
                className="ml-auto"
              />
            </div>

            {/* IA response container */}
            <div className="flex justify-end">
              {/* Align to the right */}
              <p className="inline-block max-w-max rounded-md px-2 py-2 mt-1 hover:font-bold bg-[#08fa30]">
                {`${m.iaResponse}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (chatMemory.length == 0) {
    return (
      <div className="container max-w-md rounded-md px-4 py-4 mt-2 mb-5 w-auto mx-auto shadow-md hover:shadow-xl shadow-[#000000] hover:shadow-[#000000] bg-gray-600">
        <div className="container flex-center px-4 py-2 mb-5 mt-1 rounded-md bg-slate-500">
          <h1 className="text-center mt-2 mb-2 text-xl text-white font-bold font-mono">
            {emptyMemory}
          </h1>
        </div>
        <h3 className="text-center mt-2 mb-2 text-lg font-mono hover:font-bold">
          {"Chat vacio"}
        </h3>
      </div>
    );
  }
}

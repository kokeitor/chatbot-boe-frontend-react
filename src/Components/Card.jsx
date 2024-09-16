import { useContext } from "react";
import { MemoryContext } from "../Context/MemoryContext";
import { BsRobot } from "react-icons/bs";
import { PiUserFill } from "react-icons/pi";

export function Card(props) {
  return (
    <>
      <div className="text-white font-mono text-sm max-w-max bg-[#9c9797] items-center p-2 rounded-lg">
        <div className="inline-block">
          <h1 className="font-semibold text-center">
            {props.title ? props.title : ""}
          </h1>
          <p className="text-center hover:font-bold">{props.text}</p>
          <props.icon
            size={25}
            color={props.iconColor}
            className="mt-3 mx-auto"
          />
        </div>
      </div>
    </>
  );
}

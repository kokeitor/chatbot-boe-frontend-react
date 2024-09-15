import { BsArrowUpCircle, BsFileEarmarkArrowUp } from "react-icons/bs";
import "../Styles/chat-form.css";
import { useState } from "react";

function ImageFileLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <BsFileEarmarkArrowUp size={35} />
    </label>
  );
}

function ImageButtonLabel(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.labelClassName}>
      <BsArrowUpCircle size={35} />
    </label>
  );
}

async function getIaAnswer(userMessage) {
  try {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const responseText = await response.text();
    console.log(`ASYNC fecth Response : ${responseText}`);
    return responseText[0];
  } catch (e) {
    console.log(`ASYNC fetch Error API --> ${e}`);
    return {
      ia: "Eres tonto o que",
      user: userMessage,
    };
  }
}

export function ChatForm() {
  const multipleFilesFlag = true;
  const [memory, setMemory] = useState("");
  const [files, setFiles] = useState([]);
  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          console.log(e);
          e.preventDefault();
          const iaAnswer = getIaAnswer(memory)
            .then((result) => result)
            .catch((e) => console.log(e));
          // console.log(`User : ${iaAnswer.user} -- iaAnswer : ${iaAnswer.ia}`);
          console.log(`API answwer : ${iaAnswer}`);
        }}
      >
        <ImageFileLabel htmlFor="inputFile" labelClassName="inputFileLabel" />
        <input
          type="file"
          id="inputFile"
          accept="application/pdf"
          multiple={multipleFilesFlag}
          className="inputFile"
          onChange={(e) => {
            // e.target.files.forEach(file => setFiles(file))
            setFiles([...files,e.target.files])
            // setFiles([...filesFakePath, e.target.files]);
            console.log(`files :${files}`);
          }}
        />
        <input
          type="text"
          autoComplete="off"
          minLength={5}
          placeholder="Pregúntame algo sobre tus archivos PDf del BOE ..."
          id="inputText"
          className="inputText"
          required={true}
          onChange={(e) => {
            setMemory(e.target.value);
            console.log(`Memory : ${memory}`);
          }}
        />
        <ImageButtonLabel
          htmlFor="SubmitButton"
          labelClassName="submitButtonLabel"
        />
        <button type="submit" id="SubmitButton" className="SubmitButton" />
      </form>
    </div>
  );
}

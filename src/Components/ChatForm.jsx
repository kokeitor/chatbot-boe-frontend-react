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

export function ChatForm() {
  const multipleFilesFlag = true;
  const [memory, setMemory] = useState("");
  const [files, setFiles] = useState([]);
  async function getIaAnswer(userMessage) {
    const response = { ia: "Eres tonto o que", user: userMessage };
    return response;
  }
  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          console.log(e);
          e.preventDefault();
          const iaAnswer = getIaAnswer(memory)
          // console.log(`User : ${iaAnswer.user} -- iaAnswer : ${iaAnswer.ia}`);
          console.log(`Response : ${iaAnswer}`);
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
            setFiles([...files, e.target.files]);
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

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

function getIaAnswer(userMessage) {
  const iaFakeAnswer = {
    ia: "Eres tonto o que",
    user: userMessage,
  };

  return iaFakeAnswer;
}

export function ChatForm() {
  const multipleFilesFlag = true;
  let [memory, setMemory] = useState("");
  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          console.log(e);
        }}
      >
        <ImageFileLabel htmlFor="inputFile" labelClassName="inputFileLabel" />
        <input
          type="file"
          id="inputFile"
          accept="application/pdf"
          multiple={multipleFilesFlag}
          className="inputFile"
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
        <button
          type="submit"
          onClick={(e) => {
            const iaAnswer = getIaAnswer(memory);
            console.log(`iaAnswer : ${iaAnswer}`);
          }}
          id="SubmitButton"
          className="SubmitButton"
        />
      </form>
    </div>
  );
}

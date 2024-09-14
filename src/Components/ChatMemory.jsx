import "../Styles/chat-memory.css";

const memory = "Memoria del chat";
export function ChatMemory() {
  return (
    <textarea
      id="scrollableTextarea"
      rows="5"
      cols="50"
      className="textAreaMemory"
      value={memory}
      readOnly={true}
    >
    </textarea>
  );
}

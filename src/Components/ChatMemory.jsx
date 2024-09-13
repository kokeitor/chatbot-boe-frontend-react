import "../Styles/chat-memory.css";

export function ChatMemory() {
  return (
    <textarea
      id="scrollableTextarea"
      rows="5"
      cols="50"
      className="textAreaMemory"
    >
      You can type your content here, and the textarea will become scrollable
      when the content exceeds the height.
    </textarea>
  );
}
